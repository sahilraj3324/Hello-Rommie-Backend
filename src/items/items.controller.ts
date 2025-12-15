import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@ApiTags('items')
@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new item listing' })
    @ApiResponse({ status: 201, description: 'Item created successfully' })
    create(@Body() createItemDto: CreateItemDto) {
        return this.itemsService.create(createItemDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all active items' })
    @ApiResponse({ status: 200, description: 'List of all active items' })
    findAll() {
        return this.itemsService.findAll();
    }

    @Get('published')
    @ApiOperation({ summary: 'Get all published items' })
    @ApiResponse({ status: 200, description: 'List of published items' })
    findPublished() {
        return this.itemsService.findPublished();
    }

    @Get('search/city')
    @ApiOperation({ summary: 'Search items by city' })
    @ApiQuery({ name: 'city', required: true, description: 'City name to search' })
    @ApiResponse({ status: 200, description: 'List of items in the city' })
    findByCity(@Query('city') city: string) {
        return this.itemsService.findByCity(city);
    }

    @Get('search/category')
    @ApiOperation({ summary: 'Search items by category' })
    @ApiQuery({ name: 'category', required: true, description: 'Category to search' })
    @ApiResponse({ status: 200, description: 'List of items in the category' })
    findByCategory(@Query('category') category: string) {
        return this.itemsService.findByCategory(category);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get item by ID' })
    @ApiResponse({ status: 200, description: 'Item found' })
    @ApiResponse({ status: 404, description: 'Item not found' })
    findOne(@Param('id') id: string) {
        return this.itemsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update item' })
    @ApiResponse({ status: 200, description: 'Item updated successfully' })
    @ApiResponse({ status: 404, description: 'Item not found' })
    update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
        return this.itemsService.update(id, updateItemDto);
    }

    @Patch(':id/publish')
    @ApiOperation({ summary: 'Publish item listing' })
    @ApiResponse({ status: 200, description: 'Item published successfully' })
    @ApiResponse({ status: 404, description: 'Item not found' })
    publish(@Param('id') id: string) {
        return this.itemsService.publish(id);
    }

    @Patch(':id/unpublish')
    @ApiOperation({ summary: 'Unpublish item listing' })
    @ApiResponse({ status: 200, description: 'Item unpublished successfully' })
    @ApiResponse({ status: 404, description: 'Item not found' })
    unpublish(@Param('id') id: string) {
        return this.itemsService.unpublish(id);
    }

    @Patch(':id/sold')
    @ApiOperation({ summary: 'Mark item as sold' })
    @ApiResponse({ status: 200, description: 'Item marked as sold' })
    @ApiResponse({ status: 404, description: 'Item not found' })
    markAsSold(@Param('id') id: string) {
        return this.itemsService.markAsSold(id);
    }

    @Patch(':id/reserved')
    @ApiOperation({ summary: 'Mark item as reserved' })
    @ApiResponse({ status: 200, description: 'Item marked as reserved' })
    @ApiResponse({ status: 404, description: 'Item not found' })
    markAsReserved(@Param('id') id: string) {
        return this.itemsService.markAsReserved(id);
    }

    @Patch(':id/deactivate')
    @ApiOperation({ summary: 'Deactivate item' })
    @ApiResponse({ status: 200, description: 'Item deactivated successfully' })
    @ApiResponse({ status: 404, description: 'Item not found' })
    deactivate(@Param('id') id: string) {
        return this.itemsService.deactivate(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete item' })
    @ApiResponse({ status: 200, description: 'Item deleted successfully' })
    @ApiResponse({ status: 404, description: 'Item not found' })
    remove(@Param('id') id: string) {
        return this.itemsService.remove(id);
    }
}
