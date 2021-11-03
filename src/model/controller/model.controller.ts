import { Controller, Get, Param, Query, UseFilters } from '@nestjs/common';
import { ModelService } from '../service/model.service';
import { Model } from '../entities/model.entity';
import { PaginatedModelsResultDto } from 'src/page/PaginatedModelsResult.dto';
import { PaginationDto } from 'src/page/page.dto';

@Controller('api/model')
export class ModelController {

    constructor(private readonly modelService: ModelService) {}


    /**
	 * <pre>
	 * 1. MethodName : getModelList
	 * 2. ClassName  : model.controller.ts
	 * 3. Comment    : 모델 리스트 조회
	 * 4. 작성자       : CHO
	 * 5. 작성일       : 2021. 11. 03.
	 * </pre>
	 *
	 * @return result
	 * @throws Exception
	 */
    @Get('lists/:categoryCd')
    async getModelList(@Param('categoryCd') categoryCd: number, @Query() paginationDto: PaginationDto): Promise<PaginatedModelsResultDto> {

		return await this.modelService.getModelList(categoryCd, paginationDto);

    }

    /**
	 * <pre>
	 * 1. MethodName : getModelInfo
	 * 2. ClassName  : model.controller.ts
	 * 3. Comment    : 모델 상세 조회
	 * 4. 작성자       : CHO
	 * 5. 작성일       : 2021. 11. 03.
	 * </pre>
	 *
	 * @return result
	 * @throws Exception
	 */
    @Get(':idx')
    async getModelInfo(@Param('idx') idx: number): Promise<Model> {
        return this.modelService.getModelInfo(idx);
    }
}
