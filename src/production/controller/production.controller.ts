import { Controller, Get, Param, Query, UseFilters } from '@nestjs/common';
import { ProductionService } from '../service/production.service';
import { Production } from '../entities/production.entity';
import { PaginatedModelsResultDto } from 'src/page/PaginatedModelsResult.dto';
import { PaginationDto } from 'src/page/page.dto';

@Controller('api/production')
export class ProductionController {

    constructor(private readonly productionService: ProductionService) {}


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
    @Get('lists')
    async getModelList(@Query() paginationDto: PaginationDto): Promise<PaginatedModelsResultDto> {

		return await this.productionService.getProductionList(paginationDto);

    }

}
