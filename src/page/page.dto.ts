import { ApiOperation, ApiProduces, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PaginationDto {
    @ApiProperty({ description: '페이지', default: 1, required: true })
    @IsNotEmpty()
    page: number;

    @ApiProperty({ description: '페이지 당 보여지는 수', default: 10, required: true })
    @IsNotEmpty()
    limit: number;
}