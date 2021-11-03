import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ModelModule } from './model/model.module';
import { ProductionModule } from './production/production.module';
import { Model } from './model/entities/model.entity';
import { Production } from './production/entities/production.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'prod',    
    }),
    TypeOrmModule.forRoot({     
      type: 'mysql',
      entities: [Model, Production],
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      logging: true,
      synchronize: false,
    }),
    ModelModule,
    ProductionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
