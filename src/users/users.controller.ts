import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@ApiTags('profiles')
@Controller('profiles')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new profile (also registers the user)' })
  @ApiResponse({ status: 201, description: 'Profile created successfully' })
  @ApiResponse({ status: 409, description: 'Profile with this contact number already exists' })
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.usersService.create(createProfileDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all active profiles' })
  @ApiResponse({ status: 200, description: 'List of all active profiles' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get profile by ID' })
  @ApiResponse({ status: 200, description: 'Profile found' })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('phone/:contactNumber')
  @ApiOperation({ summary: 'Get profile by contact number' })
  @ApiResponse({ status: 200, description: 'Profile found' })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  findByContactNumber(@Param('contactNumber') contactNumber: string) {
    return this.usersService.findByContactNumber(contactNumber);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update profile' })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.usersService.update(id, updateProfileDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete profile' })
  @ApiResponse({ status: 200, description: 'Profile deleted successfully' })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Patch(':id/deactivate')
  @ApiOperation({ summary: 'Deactivate profile' })
  @ApiResponse({ status: 200, description: 'Profile deactivated successfully' })
  @ApiResponse({ status: 404, description: 'Profile not found' })
  deactivate(@Param('id') id: string) {
    return this.usersService.deactivate(id);
  }
}

