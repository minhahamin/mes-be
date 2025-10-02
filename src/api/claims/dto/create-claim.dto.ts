import { IsString, IsNumber, IsDateString, IsOptional, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClaimDto {
  @ApiPropertyOptional({ description: '클레임 ID (자동 생성)', example: 'CLM2024001' })
  @IsOptional()
  @IsString()
  claimId?: string;

  @ApiProperty({ description: '고객명', example: 'ABC 제조업체' })
  @IsString()
  customerName: string;

  @ApiProperty({ description: '제품 코드', example: 'PROD001' })
  @IsString()
  productCode: string;

  @ApiProperty({ description: '제품명', example: '스마트폰 케이스' })
  @IsString()
  productName: string;

  @ApiPropertyOptional({ description: '주문 번호', example: 'ORD2024001' })
  @IsOptional()
  @IsString()
  orderNumber?: string;

  @ApiProperty({ 
    description: '클레임 유형', 
    enum: ['defect', 'delivery_delay', 'wrong_product', 'damaged', 'missing_parts', 'other'],
    example: 'defect'
  })
  @IsEnum(['defect', 'delivery_delay', 'wrong_product', 'damaged', 'missing_parts', 'other'])
  claimType: string;

  @ApiProperty({ description: '클레임 접수일', example: '2024-01-15' })
  @IsDateString()
  claimDate: string;

  @ApiProperty({ description: '클레임 상세 내용', example: '제품에 미세한 스크래치가 있어 품질에 불만을 제기' })
  @IsString()
  claimDescription: string;

  @ApiPropertyOptional({ 
    description: '처리 상태', 
    enum: ['pending', 'investigating', 'resolved', 'rejected'],
    example: 'resolved'
  })
  @IsOptional()
  @IsEnum(['pending', 'investigating', 'resolved', 'rejected'])
  status?: string;

  @ApiPropertyOptional({ 
    description: '우선순위', 
    enum: ['low', 'medium', 'high', 'urgent'],
    example: 'medium'
  })
  @IsOptional()
  @IsEnum(['low', 'medium', 'high', 'urgent'])
  priority?: string;

  @ApiProperty({ description: '담당자', example: '김고객' })
  @IsString()
  assignedTo: string;

  @ApiPropertyOptional({ description: '해결일', example: '2024-01-18' })
  @IsOptional()
  @IsDateString()
  resolutionDate?: string;

  @ApiPropertyOptional({ description: '해결 내용', example: '교체 제품 발송 완료' })
  @IsOptional()
  @IsString()
  resolutionDescription?: string;

  @ApiPropertyOptional({ description: '보상 금액', example: 25000 })
  @IsOptional()
  @Transform(({ value }) => value ? parseFloat(value) : value)
  @IsNumber()
  compensationAmount?: number;

  @ApiPropertyOptional({ 
    description: '보상 유형', 
    enum: ['refund', 'replacement', 'discount', 'repair', 'none'],
    example: 'replacement'
  })
  @IsOptional()
  @IsEnum(['refund', 'replacement', 'discount', 'repair', 'none'])
  compensationType?: string;
}
