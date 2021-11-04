import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('tsp_model')
export class Model {

    @PrimaryGeneratedColumn()
    readonly idx: number;

    @Column()
    @IsNumber()
    @ApiProperty({ description: '카테고리' })
    readonly category_cd: number;

    @Column()
    @IsString()
    @ApiProperty({ description: '카테고리명' })
    readonly category_nm: string;

    @Column()
    @IsString()
    @ApiProperty({ description: '모델 국문 이름' })
    readonly model_kor_name: string;

    @Column()
    @IsString()
    @ApiProperty({ description: '모델 영문 이름' })
    readonly model_eng_name: string;

    @Column()
    @IsNumber()
    @ApiProperty({ description: '모델 키' })
    readonly height: number;

    @Column()
    @IsString()
    @ApiProperty({ description: '모델 사이즈' })
    readonly size3: string;

    @Column()
    @IsNumber()
    @ApiProperty({ description: '모델 발 크기' })
    readonly shoes: number;

    @Column()
    @IsString()
    @ApiProperty({ description: '모델 상세 설명' })
    readonly model_description: string;

    @Column()
    @IsString()
    @ApiProperty({ description: '노출 여부' })
    readonly visible: string;

    @Column()
    @IsNumber()
    @ApiProperty({ description: '등록자' })
    readonly creator: number;

    @Column()
    @IsString()
    @ApiProperty({ description: '등록일자' })
    readonly create_time: Date;

    @Column()
    @IsNumber()
    @ApiProperty({ description: '수정자' })
    readonly updater: number;

    @Column()
    @IsString()
    @ApiProperty({ description: '수정일자' })
    readonly update_time: Date;
}