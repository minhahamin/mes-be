import { IsString, IsNumber, IsDateString, IsOptional, IsEnum, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateWorkOrderDto {
  @ApiPropertyOptional({ description: '작업지시 ID (자동 생성)', example: 'ORDER2024001' })
  @IsOptional()
  @IsString()
  orderId?: string;

  @ApiPropertyOptional({ description: '생산계획 ID', example: 'PLAN2024001' })
  @IsOptional()
  @IsString()
  planId?: string;

  @ApiProperty({ description: '제품 코드', example: 'PROD001' })
  @IsString()
  productCode: string;

  @ApiProperty({ description: '제품명', example: '스마트폰 케이스' })
  @IsString()
  productName: string;

  @ApiProperty({ description: '지시 수량', example: 1000 })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  orderQuantity: number;

  @ApiProperty({ description: '작업 시작일', example: '2024-01-15' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ description: '작업 종료일', example: '2024-01-25' })
  @IsDateString()
  endDate: string;

  @ApiPropertyOptional({ 
    description: '작업 상태', 
    enum: ['pending', 'in_progress', 'completed', 'cancelled', 'on_hold'],
    example: 'in_progress'
  })
  @IsOptional()
  @IsEnum(['pending', 'in_progress', 'completed', 'cancelled', 'on_hold'])
  status?: string;

  @ApiPropertyOptional({ 
    description: '우선순위', 
    enum: ['low', 'normal', 'high', 'urgent'],
    example: 'high'
  })
  @IsOptional()
  @IsEnum(['low', 'normal', 'high', 'urgent'])
  priority?: string;

  @ApiProperty({ description: '작업장', example: 'A라인' })
  @IsString()
  workCenter: string;

  @ApiProperty({ description: '감독자', example: '김감독' })
  @IsString()
  supervisor: string;

  @ApiProperty({ description: '작업자', example: '이작업' })
  @IsString()
  operator: string;

  @ApiPropertyOptional({ description: '예상 작업시간 (시간)', example: 40 })
  @IsOptional()
  @Transform(({ value }) => value ? parseFloat(value) : value)
  @IsNumber()
  estimatedHours?: number;

  @ApiPropertyOptional({ description: '실제 작업시간 (시간)', example: 25 })
  @IsOptional()
  @Transform(({ value }) => value ? parseFloat(value) : value)
  @IsNumber()
  actualHours?: number;

  @ApiPropertyOptional({ description: '품질 기준', example: 'ISO 9001' })
  @IsOptional()
  @IsString()
  qualityStandard?: string;

  @ApiPropertyOptional({ 
    description: '필요 자재 목록', 
    type: [String],
    example: ['실리콘', '하드케이스', '포장재']
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  materials?: string[];

  @ApiPropertyOptional({ description: '작업 지시사항', example: '정밀도 높은 가공 필요, 품질 검사 필수' })
  @IsOptional()
  @IsString()
  instructions?: string;

  @ApiPropertyOptional({ description: '메모', example: '긴급 주문으로 우선 처리' })
  @IsOptional()
  @IsString()
  notes?: string;
}
