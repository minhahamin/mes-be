import { IsString, IsNumber, IsDateString, IsOptional, IsEnum, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductionPlanDto {
  @ApiPropertyOptional({ description: '생산계획 ID (자동 생성)', example: 'PLAN2024001' })
  @IsOptional()
  @IsString()
  planId?: string;

  @ApiProperty({ description: '제품 코드', example: 'PROD001' })
  @IsString()
  productCode: string;

  @ApiProperty({ description: '제품명', example: '스마트폰 케이스' })
  @IsString()
  productName: string;

  @ApiProperty({ description: '계획 수량', example: 1000 })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  planQuantity: number;

  @ApiProperty({ description: '계획 시작일', example: '2024-01-15' })
  @IsDateString()
  plannedStartDate: string;

  @ApiProperty({ description: '계획 종료일', example: '2024-01-25' })
  @IsDateString()
  plannedEndDate: string;

  @ApiPropertyOptional({ description: '실제 시작일', example: '2024-01-15' })
  @IsOptional()
  @IsDateString()
  actualStartDate?: string;

  @ApiPropertyOptional({ description: '실제 종료일', example: '2024-01-25' })
  @IsOptional()
  @IsDateString()
  actualEndDate?: string;

  @ApiPropertyOptional({ 
    description: '생산 상태', 
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

  @ApiProperty({ description: '담당자', example: '김생산' })
  @IsString()
  responsiblePerson: string;

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

  @ApiPropertyOptional({ 
    description: '필요 자재 목록', 
    type: [String],
    example: ['실리콘', '하드케이스', '포장재']
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  materials?: string[];

  @ApiPropertyOptional({ description: '메모', example: '긴급 주문으로 우선 처리' })
  @IsOptional()
  @IsString()
  notes?: string;
}
