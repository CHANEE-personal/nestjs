import { Body, Controller, Get, Param, Post, Query, UseFilters } from '@nestjs/common';
import { ModelService } from '../service/model.service';
import { Model } from '../entities/model.entity';
import { PaginatedModelsResultDto } from 'src/page/PaginatedModelsResult.dto';
import { PaginationDto } from 'src/page/page.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api/model')
@ApiTags('모델 관련 API')
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
	@ApiOperation({ summary: '모델 리스트 조회 API', description: '모델 리스트를 조회한다.'})
    @ApiCreatedResponse({ description: '모델 리스트를 조회한다.', type: Model })
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
	@ApiOperation({ summary: '모델 상세 조회 API', description: '모델을 상세 조회한다.'})
    @ApiCreatedResponse({ description: '모델을 상세 조회한다.', type: Model })
    async getModelInfo(@Param('idx') idx: number): Promise<Model> {
        return this.modelService.getModelInfo(idx);
    }

	/**
	 * <pre>
	 * 1. MethodName : insertModel
	 * 2. ClassName  : model.controller.ts
	 * 3. Comment    : 모델 등록
	 * 4. 작성자       : CHO
	 * 5. 작성일       : 2021. 11. 04.
	 * </pre>
	 *
	 * @return result
	 * @throws Exception
	 */
	@Post()
	@ApiOperation({ summary: '모델 등록 API', description: '모델을 등록한다.' })
	@ApiCreatedResponse({ description: '모델을 등록한다.', type: Model })
	async insertModel(@Body() model: Model): Promise<string> {
		if(this.modelService.insertModel(model) != null) {
			return "Y";
		} else {
			return "N";
		}
	}
}
