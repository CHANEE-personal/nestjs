import { Module } from "@nestjs/common";
import { ProductionController } from "./controller/production.controller";
import { ProductionService } from "./service/production.service";
import { Production } from "./entities/production.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Production])],
    controllers: [ProductionController],
    providers: [ProductionService]
})

export class ProductionModule {}