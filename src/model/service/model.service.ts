import { Injectable, NotFoundException, UseFilters } from '@nestjs/common';
import { Model } from '../entities/model.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedModelsResultDto } from 'src/page/PaginatedModelsResult.dto';
import { PaginationDto } from 'src/page/page.dto';
import { Repository } from 'typeorm';

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
}

