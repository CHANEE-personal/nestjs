import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Model } from '../entities/model.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ModelService {

    constructor(
        @InjectRepository(Model)
        private modelRepository: Repository<Model>) {}


    getAll() {
        return this.modelRepository.find();
    }    

    getOne(idx: number) {
        const model = this.modelRepository.createQueryBuilder()
        .where('idx = :idx', {idx: idx})
        .getOne();

        if(!model) {
            throw new NotFoundException(`user id ${idx} not found`);
        }
        return model;
    }
}

