import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from './schemas/room.schema';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

@Injectable()
export class RoomsService {
    constructor(
        @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    ) { }

    async create(createRoomDto: CreateRoomDto): Promise<Room> {
        const createdRoom = new this.roomModel(createRoomDto);
        return createdRoom.save();
    }

    async findAll(): Promise<Room[]> {
        return this.roomModel.find({ isActive: true }).exec();
    }

    async findPublished(): Promise<Room[]> {
        return this.roomModel.find({ status: 'published', isActive: true }).exec();
    }

    async findByCity(city: string): Promise<Room[]> {
        return this.roomModel.find({
            city: { $regex: city, $options: 'i' },
            status: 'published',
            isActive: true
        }).exec();
    }

    async findOne(id: string): Promise<Room> {
        const room = await this.roomModel.findById(id).exec();
        if (!room) {
            throw new NotFoundException(`Room with ID ${id} not found`);
        }
        return room;
    }

    async update(id: string, updateRoomDto: UpdateRoomDto): Promise<Room> {
        const updatedRoom = await this.roomModel
            .findByIdAndUpdate(id, updateRoomDto, { new: true })
            .exec();
        if (!updatedRoom) {
            throw new NotFoundException(`Room with ID ${id} not found`);
        }
        return updatedRoom;
    }

    async publish(id: string): Promise<Room> {
        const room = await this.roomModel
            .findByIdAndUpdate(
                id,
                { status: 'published', publishedAt: new Date() },
                { new: true }
            )
            .exec();
        if (!room) {
            throw new NotFoundException(`Room with ID ${id} not found`);
        }
        return room;
    }

    async unpublish(id: string): Promise<Room> {
        const room = await this.roomModel
            .findByIdAndUpdate(
                id,
                { status: 'unpublished', unpublishedAt: new Date() },
                { new: true }
            )
            .exec();
        if (!room) {
            throw new NotFoundException(`Room with ID ${id} not found`);
        }
        return room;
    }

    async remove(id: string): Promise<Room> {
        const deletedRoom = await this.roomModel.findByIdAndDelete(id).exec();
        if (!deletedRoom) {
            throw new NotFoundException(`Room with ID ${id} not found`);
        }
        return deletedRoom;
    }

    async deactivate(id: string): Promise<Room> {
        const room = await this.roomModel
            .findByIdAndUpdate(id, { isActive: false }, { new: true })
            .exec();
        if (!room) {
            throw new NotFoundException(`Room with ID ${id} not found`);
        }
        return room;
    }
}
