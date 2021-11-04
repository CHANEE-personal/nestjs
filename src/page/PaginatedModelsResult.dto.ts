import { Model } from '../model/entities/model.entity';

export class PaginatedModelsResultDto {
    data: Object[]
    ListTotalCnt: number
    pageSize: number
    perPageListCnt: number
}