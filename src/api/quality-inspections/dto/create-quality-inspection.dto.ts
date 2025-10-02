import { IsString, IsNumber, IsDateString, IsOptional, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateQualityInspectionDto {
  @ApiPropertyOptional({ description: '품질검사 ID (자동 생성)', example: 'Q2024001' })
  @IsOptional()
  @IsString()
  qualityId?: string;

  @ApiProperty({ description: '제품 코드', example: 'PROD002' })
  @IsString()
  productCode: string;

  @ApiProperty({ description: '제품명', example: '무선 이어폰' })
  @IsString()
  productName: string;

  @ApiPropertyOptional({ description: '배치 번호 (자동 생성)', example: 'BATCH002' })
  @IsOptional()
  @IsString()
  batchNumber?: string;

  @ApiProperty({ description: '검사일', example: '2024-01-16' })
  @IsDateString()
  inspectionDate: string;

  @ApiProperty({ description: '검사자', example: '이검사' })
  @IsString()
  inspector: string;

  @ApiProperty({ 
    description: '검사 유형', 
    enum: ['incoming', 'in_process', 'final', 'outgoing'],
    example: 'incoming'
  })
  @IsEnum(['incoming', 'in_process', 'final', 'outgoing'])
  inspectionType: string;

  @ApiProperty({ 
    description: '검사 결과', 
    enum: ['pass', 'fail', 'pending', 'conditional_pass'],
    example: 'fail'
  })
  @IsEnum(['pass', 'fail', 'pending', 'conditional_pass'])
  status: string;

  @ApiProperty({ description: '검사 수량', example: 50 })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  quantityInspected: number;

  @ApiProperty({ description: '합격 수량', example: 35 })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  quantityPassed: number;

  @ApiProperty({ description: '불합격 수량', example: 15 })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  quantityFailed: number;

  @ApiPropertyOptional({ description: '합격률 (%)', example: 70.0 })
  @IsOptional()
  @Transform(({ value }) => value ? parseFloat(value) : value)
  @IsNumber()
  passRate?: number;

  @ApiPropertyOptional({ description: '불량 유형', example: '음질 불량' })
  @IsOptional()
  @IsString()
  defectType?: string;

  @ApiPropertyOptional({ description: '불량 상세 설명', example: '좌측 이어폰 음질 이상' })
  @IsOptional()
  @IsString()
  defectDescription?: string;

  @ApiPropertyOptional({ description: '비고', example: '공급업체에 반품 요청' })
  @IsOptional()
  @IsString()
  remarks?: string;
}
