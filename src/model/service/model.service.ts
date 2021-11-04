import { Injectable, NotFoundException, UseFilters } from '@nestjs/common';
import { Model } from '../entities/model.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedModelsResultDto } from 'src/page/PaginatedModelsResult.dto';
import { PaginationDto } from 'src/page/page.dto';
import { getConnection, Repository, Transaction, TransactionRepository } from 'typeorm';

@Injectable()
export class ModelService {

    constructor(
        @InjectRepository(Model)		
        private modelRepository: Repository<Model>) {}


    /**
	 * <pre>
	 * 1. MethodName : getModelList
	 * 2. ClassName  : model.service.ts
	 * 3. Comment    : 모델 리스트 조회
	 * 4. 작성자       : CHO
	 * 5. 작성일       : 2021. 11. 03.
	 * </pre>
	 *
	 * @return result
	 * @throws Exception
	 */    
    async getModelList(categoryCd: number, paginationDto: PaginationDto): Promise<PaginatedModelsResultDto>  {		
		
		const skippedItems = (paginationDto.page - 1) * paginationDto.limit;

		// 모델 리스트 총 갯수
		const ListTotalCnt = await this.modelRepository.createQueryBuilder()
						.where('category_cd = :categoryCd', {categoryCd: categoryCd})
						.andWhere('visible = :visible', {visible: 'Y'})
						.getCount();

		// 모델 리스트
        const modelList = await this.modelRepository.createQueryBuilder()
                    .where('category_cd = :categoryCd', {categoryCd: categoryCd})
                    .andWhere('visible = :visible', {visible: 'Y'})
					.offset(skippedItems)
					.limit(paginationDto.limit)
                    .getMany();

		return {
			data: modelList,
			ListTotalCnt,			
			pageSize: paginationDto.limit,
			perPageListCnt: Math.ceil((ListTotalCnt - 1) / paginationDto.limit + 1),			
		}
    }  
    
    
    /**
	 * <pre>
	 * 1. MethodName : getModelInfo
	 * 2. ClassName  : model.service.ts
	 * 3. Comment    : 모델 상세 조회
	 * 4. 작성자       : CHO
	 * 5. 작성일       : 2021. 11. 03.
	 * </pre>
	 *
	 * @return result
	 * @throws Exception
	 */
    async getModelInfo(idx: number): Promise<Model> {
        const model = this.modelRepository.createQueryBuilder()
        .where('idx = :idx', {idx: idx})
        .getOne();

        if(!model) {
            throw new NotFoundException(`model idx ${idx} not found`);
        }
        return model;
    }

	/**
	 * <pre>
	 * 1. MethodName : insertModel
	 * 2. ClassName  : model.service.ts
	 * 3. Comment    : 모델 등록
	 * 4. 작성자       : CHO
	 * 5. 작성일       : 2021. 11. 04.
	 * </pre>
	 *
	 * @return result
	 * @throws Exception
	 */
	async insertModel(model: Model) {
		const newModel = this.modelRepository.create(model);
		return await this.modelRepository.save(newModel);
	}

	/**
	 * <pre>
	 * 1. MethodName : updateModel
	 * 2. ClassName  : model.service.ts
	 * 3. Comment    : 모델 수정
	 * 4. 작성자       : CHO
	 * 5. 작성일       : 2021. 11. 04.
	 * </pre>
	 *
	 * @return result
	 * @throws Exception
	 */	
	async updateModel(model: Model, idx: number) {

		const queryRunner = getConnection().createQueryRunner();
		await queryRunner.connect();

		await queryRunner.startTransaction();

		try {

			await this.modelRepository.createQueryBuilder()		
			.update(model)
			.set({
				category_cd: model.category_cd,
				category_nm: model.category_nm,
				model_kor_name: model.model_kor_name,
				model_eng_name: model.model_eng_name,
				height: model.height,
				size3: model.size3,
				shoes: model.shoes,
				model_description: model.model_description,
				visible: model.visible,
				updater: 1,
				update_time: new Date()
			})
			.where('idx = :idx', {idx: idx})
			.execute();

			await queryRunner.commitTransaction();

			return 1;

		} catch (err) {
			await queryRunner.rollbackTransaction();
		} finally {
			await queryRunner.release();
		}
	}
}

