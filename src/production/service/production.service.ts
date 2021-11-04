import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Production } from '../entities/production.entity';
import { PaginatedModelsResultDto } from 'src/page/PaginatedModelsResult.dto';
import { PaginationDto } from 'src/page/page.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ProductionService {

    constructor(
        @InjectRepository(Production)
        private productionRepository: Repository<Production>) {}


    /**
	 * <pre>
	 * 1. MethodName : getProductionList
	 * 2. ClassName  : production.service.ts
	 * 3. Comment    : 프로덕션 리스트 조회
	 * 4. 작성자       : CHO
	 * 5. 작성일       : 2021. 11. 04.
	 * </pre>
	 *
	 * @return result
	 * @throws Exception
	 */    
    async getProductionList(paginationDto: PaginationDto): Promise<PaginatedModelsResultDto>  {		
		
		const skippedItems = (paginationDto.page - 1) * paginationDto.limit;

		// 프로덕션 리스트 총 갯수
		const ListTotalCnt = await this.productionRepository.createQueryBuilder()						
						.where('visible = :visible', {visible: 'Y'})
						.getCount();

		// 프로덕션 리스트
        const productionList = await this.productionRepository.createQueryBuilder()                    
                    .where('visible = :visible', {visible: 'Y'})
					.offset(skippedItems)
					.limit(paginationDto.limit)
                    .getMany();

		return {
			data: productionList,
			ListTotalCnt,			
			pageSize: paginationDto.limit,
			perPageListCnt: Math.ceil((ListTotalCnt - 1) / paginationDto.limit + 1),			
		}
    }

    /**
	 * <pre>
	 * 1. MethodName : getProductionInfo
	 * 2. ClassName  : production.service.ts
	 * 3. Comment    : 프로덕션 상세 조회
	 * 4. 작성자       : CHO
	 * 5. 작성일       : 2021. 11. 04.
	 * </pre>
	 *
	 * @return result
	 * @throws Exception
	 */
    async getProductionInfo(idx: number): Promise<Production> {
        const production = this.productionRepository.createQueryBuilder()
                            .where('idx = :idx', {idx: idx})
                            .getOne();

        if(!production) {
            throw new NotFoundException(`production idx ${idx} not found`)
        }
        return production;
    }
}
