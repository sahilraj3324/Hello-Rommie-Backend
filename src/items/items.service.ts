import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from './schemas/item.schema';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemsService {
    constructor(
        @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
    ) { }

    async create(createItemDto: CreateItemDto): Promise<Item> {
        const createdItem = new this.itemModel(createItemDto);
        return createdItem.save();
    }

    async findAll(): Promise<Item[]> {
        return this.itemModel.find({ isActive: true }).exec();
    }

    async findPublished(): Promise<Item[]> {
        return this.itemModel.find({ status: 'published', isActive: true }).exec();
    }

    async findByCity(city: string): Promise<Item[]> {
        return this.itemModel.find({
            city: { $regex: city, $options: 'i' },
            status: 'published',
            isActive: true,
        }).exec();
    }

    async findByCategory(category: string): Promise<Item[]> {
        return this.itemModel.find({
            category: { $regex: category, $options: 'i' },
            status: 'published',
            isActive: true,
        }).exec();
    }

    async findOne(id: string): Promise<Item> {
        const item = await this.itemModel.findById(id).exec();
        if (!item) {
            throw new NotFoundException(`Item with ID ${id} not found`);
        }
        return item;
    }

    async update(id: string, updateItemDto: UpdateItemDto): Promise<Item> {
        const updatedItem = await this.itemModel
            .findByIdAndUpdate(id, updateItemDto, { new: true })
            .exec();
        if (!updatedItem) {
            throw new NotFoundException(`Item with ID ${id} not found`);
        }
        return updatedItem;
    }

    async publish(id: string): Promise<Item> {
        const item = await this.itemModel
            .findByIdAndUpdate(
                id,
                { status: 'published', publishedAt: new Date() },
                { new: true }
            )
            .exec();
        if (!item) {
            throw new NotFoundException(`Item with ID ${id} not found`);
        }
        return item;
    }

    async unpublish(id: string): Promise<Item> {
        const item = await this.itemModel
            .findByIdAndUpdate(
                id,
                { status: 'unpublished', unpublishedAt: new Date() },
                { new: true }
            )
            .exec();
        if (!item) {
            throw new NotFoundException(`Item with ID ${id} not found`);
        }
        return item;
    }

    async markAsSold(id: string): Promise<Item> {
        const item = await this.itemModel
            .findByIdAndUpdate(id, { availabilityStatus: 'sold' }, { new: true })
            .exec();
        if (!item) {
            throw new NotFoundException(`Item with ID ${id} not found`);
        }
        return item;
    }

    async markAsReserved(id: string): Promise<Item> {
        const item = await this.itemModel
            .findByIdAndUpdate(id, { availabilityStatus: 'reserved' }, { new: true })
            .exec();
        if (!item) {
            throw new NotFoundException(`Item with ID ${id} not found`);
        }
        return item;
    }

    async remove(id: string): Promise<Item> {
        const deletedItem = await this.itemModel.findByIdAndDelete(id).exec();
        if (!deletedItem) {
            throw new NotFoundException(`Item with ID ${id} not found`);
        }
        return deletedItem;
    }

    async deactivate(id: string): Promise<Item> {
        const item = await this.itemModel
            .findByIdAndUpdate(id, { isActive: false }, { new: true })
            .exec();
        if (!item) {
            throw new NotFoundException(`Item with ID ${id} not found`);
        }
        return item;
    }
}
