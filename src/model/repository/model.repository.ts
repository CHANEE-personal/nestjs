import { AbstractRepository, EntityRepository } from 'typeorm';
import { Model } from '../entities/model.entity';

@EntityRepository(Model)
export class ModelRepository extends AbstractRepository<Model> {

    public async getOne(idx: number) {
        const qb = this.repository
        .createQueryBuilder('ModelEntity')
        .andWhere('ModelEntity.idx = :idx', {idx: idx});

        return qb.getOne();
    }
}