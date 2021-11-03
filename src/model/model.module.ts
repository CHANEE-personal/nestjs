import { Module } from "@nestjs/common";
import { ModelController } from "./controller/model.controller";
import { ModelService } from "./service/model.service";
import { Model } from "./entities/model.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Model])],
    controllers: [ModelController],
    providers: [ModelService]    
})

export class ModelModule {}