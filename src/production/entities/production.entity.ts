import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('tsp_production')
export class Production {

    @PrimaryGeneratedColumn()
    readonly idx: number;

    @Column()
    readonly title: string;

    @Column()
    readonly description: string;

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