import { Model } from '../model/entities/model.entity';

export class PaginatedModelsResultDto {
    data: Model[]
    ListTotalCnt: number
    pageSize: number
    perPageListCnt: number
}