import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString } from "class-validator";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('tsp_production')
export class Production {

    @PrimaryGeneratedColumn()
    readonly idx: number;

    @Column()
    @IsString()
    @ApiProperty({ description: '제목' })
    readonly title: string;

    @Column()
    @IsString()
    @ApiProperty({ description: '내용' })
    readonly description: string;

    @Column()
    @IsString()
    @ApiProperty({ description: '노출여부' })
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