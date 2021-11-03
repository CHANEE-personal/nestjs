import { Injectable, NotFoundException, UseFilters } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Model } from '../entities/model.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ModelService {

    constructor(
        @InjectRepository(Model)
        private modelRepository: Repository<Model>) {}


    /**
	 * <pre>
	 * 1. MethodName : getAll
	 * 2. ClassName  : model.service.ts
	 * 3. Comment    : 모델 리스트 조회
	 * 4. 작성자       : CHO
	 * 5. 작성일       : 2021. 11. 03.
	 * </pre>
	 *
	 * @return result
	 * @throws Exception
	 */    
    async getModelList(categoryCd: number): Promise<Model[]>  {
        return this.modelRepository.createQueryBuilder()
                    .where('category_cd = :categoryCd', {categoryCd: categoryCd})
                    .getMany();
    }  
    
    
    /**
     * 모델 상세 조회
     * @param idx 
     * @returns 
     */
    async getOne(idx: number): Promise<Model> {
        const model = this.modelRepository.createQueryBuilder()
        .where('idx = :idx', {idx: idx})
        .getOne();

        if(!model) {
            throw new NotFoundException(`user id ${idx} not found`);
        }
        return model;
    }
}

