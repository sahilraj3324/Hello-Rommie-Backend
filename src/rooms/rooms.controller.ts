import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@ApiTags('rooms')
@Controller('rooms')
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) { }

    @Post()
    @ApiOperation({ summary: 'Create a new room listing' })
    @ApiResponse({ status: 201, description: 'Room created successfully' })
    create(@Body() createRoomDto: CreateRoomDto) {
        return this.roomsService.create(createRoomDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all active rooms' })
    @ApiResponse({ status: 200, description: 'List of all active rooms' })
    findAll() {
        return this.roomsService.findAll();
    }

    @Get('published')
    @ApiOperation({ summary: 'Get all published rooms' })
    @ApiResponse({ status: 200, description: 'List of published rooms' })
    findPublished() {
        return this.roomsService.findPublished();
    }

    @Get('search')
    @ApiOperation({ summary: 'Search rooms by city' })
    @ApiQuery({ name: 'city', required: true, description: 'City name to search' })
    @ApiResponse({ status: 200, description: 'List of rooms in the city' })
    findByCity(@Query('city') city: string) {
        return this.roomsService.findByCity(city);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get room by ID' })
    @ApiResponse({ status: 200, description: 'Room found' })
    @ApiResponse({ status: 404, description: 'Room not found' })
    findOne(@Param('id') id: string) {
        return this.roomsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update room' })
    @ApiResponse({ status: 200, description: 'Room updated successfully' })
    @ApiResponse({ status: 404, description: 'Room not found' })
    update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
        return this.roomsService.update(id, updateRoomDto);
    }

    @Patch(':id/publish')
    @ApiOperation({ summary: 'Publish room listing' })
    @ApiResponse({ status: 200, description: 'Room published successfully' })
    @ApiResponse({ status: 404, description: 'Room not found' })
    publish(@Param('id') id: string) {
        return this.roomsService.publish(id);
    }

    @Patch(':id/unpublish')
    @ApiOperation({ summary: 'Unpublish room listing' })
    @ApiResponse({ status: 200, description: 'Room unpublished successfully' })
    @ApiResponse({ status: 404, description: 'Room not found' })
    unpublish(@Param('id') id: string) {
        return this.roomsService.unpublish(id);
    }

    @Patch(':id/deactivate')
    @ApiOperation({ summary: 'Deactivate room' })
    @ApiResponse({ status: 200, description: 'Room deactivated successfully' })
    @ApiResponse({ status: 404, description: 'Room not found' })
    deactivate(@Param('id') id: string) {
        return this.roomsService.deactivate(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete room' })
    @ApiResponse({ status: 200, description: 'Room deleted successfully' })
    @ApiResponse({ status: 404, description: 'Room not found' })
    remove(@Param('id') id: string) {
        return this.roomsService.remove(id);
    }
}
