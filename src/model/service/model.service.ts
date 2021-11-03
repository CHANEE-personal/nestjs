import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Model } from '../entities/model.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ModelService {

    constructor(
        @InjectRepository(Model)
        private modelRepository: Repository<Model>) {}


    /**    
     * Method : getAll
     * 2021.11.03
     * description: 모델 리스트 조회 By Cho
     * @returns 
     */
    getAll() {
        return this.modelRepository.find();
    }  
    
    
    /**
     * 모델 상세 조회
     * @param idx 
     * @returns 
     */
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

