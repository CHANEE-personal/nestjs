import { Body, Controller, Get, Param, Post, Query, UseFilters } from '@nestjs/common';
import { ProductionService } from '../service/production.service';
import { Production } from '../entities/production.entity';
import { PaginatedModelsResultDto } from 'src/page/PaginatedModelsResult.dto';
import { PaginationDto } from 'src/page/page.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api/production')
@ApiTags('프로덕션 관련 API')
export class ProductionController {

    constructor(private readonly productionService: ProductionService) {}


    /**
	 * <pre>
	 * 1. MethodName : getProductionList
	 * 2. ClassName  : production.controller.ts
	 * 3. Comment    : 프로덕션 리스트 조회
	 * 4. 작성자       : CHO
	 * 5. 작성일       : 2021. 11. 04.
	 * </pre>
	 *
	 * @return result
	 * @throws Exception
	 */
    @Get('lists')
    @ApiOperation({ summary: '프로덕션 리스트 조회 API', description: '프로덕션 리스트를 조회한다.'})
    @ApiCreatedResponse({ description: '프로덕션 리스트를 조회한다.', type: Production })
    async getProductionList(@Query() paginationDto: PaginationDto): Promise<PaginatedModelsResultDto> {

		return await this.productionService.getProductionList(paginationDto);

    }

    /**
	 * <pre>
	 * 1. MethodName : getProductionInfo
	 * 2. ClassName  : production.controller.ts
	 * 3. Comment    : 프로덕션 상세 조회
	 * 4. 작성자       : CHO
	 * 5. 작성일       : 2021. 11. 04.
	 * </pre>
	 *
	 * @return result
	 * @throws Exception
	 */
    @Get(':idx')
    @ApiOperation({ summary: '프로덕션 상세 조회 API', description: '프로덕션 상세를 조회한다.'})
    @ApiCreatedResponse({ description: '프로덕션 상세를 조회한다.', type: Production })
    async getProductionInfo(@Param('idx') idx: number): Promise<Production> {
        return this.productionService.getProductionInfo(idx);
    }

    /**
	 * <pre>
	 * 1. MethodName : insertProduction
	 * 2. ClassName  : production.controller.ts
	 * 3. Comment    : 프로덕션 등록
	 * 4. 작성자       : CHO
	 * 5. 작성일       : 2021. 11. 04.
	 * </pre>
	 *
	 * @return result
	 * @throws Exception
	 */
     @Post()
     @ApiOperation({ summary: '프로덕션 등록 API', description: '프로덕션을 등록한다.'})
     @ApiCreatedResponse({ description: '프로덕션을 등록한다.', type: Production })
     async insertProduction(@Body() production: Production): Promise<string> {
         if(this.productionService.insertProduction(production) != null) {
             return "Y"
         } else {
             return "N";
         }
     }

}
