import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('tsp_model')
export class Model {
    @PrimaryGeneratedColumn()
    readonly idx: number;

    @Column()
    readonly category_cd: number;

    @Column()
    readonly category_nm: string;

    @Column()
    readonly model_kor_name: string;

    @Column()
    readonly model_eng_name: string;

    @Column()
    readonly height: number;

    @Column()
    readonly size3: string;

    @Column()
    readonly shoes: number;

    @Column()
    readonly model_description: string;

    @Column()
    readonly visible: string;

    @Column()
    readonly creator: number;

    @Column()
    readonly create_time: Date;

    @Column()
    readonly updater: number;

    @Column()
    readonly update_time: Date;
}