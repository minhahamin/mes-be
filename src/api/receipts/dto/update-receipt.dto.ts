import { IsString, IsNumber, IsPositive, IsDateString, MinLength, IsIn, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReceiptDto {
  @ApiProperty({
    description: '발주 ID',
    example: 'PO2024001',
    required: false
  })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: '발주 ID를 입력해주세요.' })
  orderingId?: string;


  @ApiProperty({
    description: '공급업체 ID',
    example: 'SUP001',
    required: false
  })
  @IsOptional()
  @IsString()
  supplierId?: string;

  @ApiProperty({
    description: '공급업체명',
    example: 'ABC 전자',
    required: false
  })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: '공급업체명을 입력해주세요.' })
  supplierName?: string;

  @ApiProperty({
    description: '품목명',
    example: '스마트폰 케이스',
    required: false
  })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: '품목명을 입력해주세요.' })
  productName?: string;

  @ApiProperty({
    description: '품목 코드',
    example: 'PROD001',
    required: false
  })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: '품목 코드를 입력해주세요.' })
  productCode?: string;

  @ApiProperty({
    description: '발주 수량',
    example: 1000,
    type: 'number',
    required: false
  })
  @IsOptional()
  @IsNumber({}, { message: '발주 수량은 숫자여야 합니다.' })
  @IsPositive({ message: '발주 수량은 양수여야 합니다.' })
  orderedQuantity?: number;

  @ApiProperty({
    description: '입고 수량',
    example: 800,
    type: 'number',
    required: false
  })
  @IsOptional()
  @IsNumber({}, { message: '입고 수량은 숫자여야 합니다.' })
  receivedQuantity?: number;

  @ApiProperty({
    description: '납품일',
    example: '2024-01-25',
    format: 'date',
    required: false
  })
  @IsOptional()
  @IsDateString({}, { message: '올바른 날짜 형식을 입력해주세요.' })
  deliveryDate?: string;

  @ApiProperty({
    description: '입고일',
    example: '2024-01-26',
    format: 'date',
    required: false
  })
  @IsOptional()
  @IsDateString({}, { message: '올바른 날짜 형식을 입력해주세요.' })
  receivedDate?: string;

  @ApiProperty({
    description: '창고 위치',
    example: 'A구역-1층-05호',
    required: false
  })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: '창고 위치를 입력해주세요.' })
  warehouseLocation?: string;

  @ApiProperty({
    description: '입고 상태',
    example: 'pending',
    enum: ['pending', 'partial', 'received', 'rejected'],
    required: false
  })
  @IsOptional()
  @IsString()
  @IsIn(['pending', 'partial', 'received', 'rejected'], { 
    message: '입고 상태는 pending, partial, received, rejected 중 하나여야 합니다.' 
  })
  status?: string;

  @ApiProperty({
    description: '담당자',
    example: '김창고',
    required: false
  })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: '담당자를 입력해주세요.' })
  manager?: string;

  @ApiProperty({
    description: '기타 메모',
    example: '품질 검사 완료',
    required: false
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
