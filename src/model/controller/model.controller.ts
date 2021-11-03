import { Controller, Get, Param } from '@nestjs/common';
import { ModelService } from '../service/model.service';

@Controller('api/model')
export class ModelController {

    constructor(private readonly modelService: ModelService) {}

    @Get('lists')
    getAll() {
        return this.modelService.getAll();
    }

    @Get(':idx')
    getOne(@Param('idx') idx: number) {
        return this.modelService.getOne(idx);
    }
}
