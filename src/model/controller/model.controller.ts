import { Controller, Get, Param, UseFilters } from '@nestjs/common';
import { ModelService } from '../service/model.service';
import { Model } from '../entities/model.entity';

@Controller('api/model')
export class ModelController {

    constructor(private readonly modelService: ModelService) {}

    @Get('lists/:categoryCd')
    async getModelList(@Param('categoryCd') categoryCd: number): Promise<Model[]> {
        return this.modelService.getModelList(categoryCd);
    }

    @Get(':idx')
    async getModelInfo(@Param('idx') idx: number): Promise<Model> {
        return this.modelService.getOne(idx);
    }
}
