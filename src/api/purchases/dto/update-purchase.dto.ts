import { IsString, IsNumber, IsPositive, IsDateString, MinLength, IsIn, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePurchaseDto {
  @ApiProperty({
    description: '공급업체 ID',
    example: 'SUP002',
    required: false
  })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: '공급업체 ID를 입력해주세요.' })
  supplierId?: string;

  @ApiProperty({
    description: '공급업체명',
    example: 'XYZ 전자부품',
    required: false
  })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: '공급업체명을 입력해주세요.' })
  supplierName?: string;

  @ApiProperty({
    description: '물품 코드',
    example: 'MAT002',
    required: false
  })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: '물품 코드를 입력해주세요.' })
  productCode?: string;

  @ApiProperty({
    description: '물품명',
    example: '반도체 칩',
    required: false
  })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: '물품명을 입력해주세요.' })
  productName?: string;

  @ApiProperty({
    description: '발주 수량',
    example: 1000,
    type: 'number',
    required: false
  })
  @IsOptional()
  @IsNumber({}, { message: '발주 수량은 숫자여야 합니다.' })
  @IsPositive({ message: '발주 수량은 양수여야 합니다.' })
  orderQuantity?: number;

  @ApiProperty({
    description: '단가',
    example: 2000,
    type: 'number',
    required: false
  })
  @IsOptional()
  @IsNumber({}, { message: '단가는 숫자여야 합니다.' })
  @IsPositive({ message: '단가는 양수여야 합니다.' })
  unitPrice?: number;

  @ApiProperty({
    description: '발주일',
    example: '2024-01-20',
    format: 'date',
    required: false
  })
  @IsOptional()
  @IsDateString({}, { message: '올바른 날짜 형식을 입력해주세요.' })
  orderDate?: string;

  @ApiProperty({
    description: '예상 납기일',
    example: '2024-02-20',
    format: 'date',
    required: false
  })
  @IsOptional()
  @IsDateString({}, { message: '올바른 날짜 형식을 입력해주세요.' })
  expectedDeliveryDate?: string;

  @ApiProperty({
    description: '발주 상태',
    example: 'ordered',
    enum: ['pending', 'ordered', 'confirmed', 'delivered', 'completed', 'cancelled'],
    required: false
  })
  @IsOptional()
  @IsString()
  @IsIn(['pending', 'ordered', 'confirmed', 'delivered', 'completed', 'cancelled'], { 
    message: '발주 상태는 pending, ordered, confirmed, delivered, completed, cancelled 중 하나여야 합니다.' 
  })
  status?: string;

  @ApiProperty({
    description: '우선순위',
    example: 'medium',
    enum: ['low', 'medium', 'high', 'urgent'],
    required: false
  })
  @IsOptional()
  @IsString()
  @IsIn(['low', 'medium', 'high', 'urgent'], { 
    message: '우선순위는 low, medium, high, urgent 중 하나여야 합니다.' 
  })
  priority?: string;

  @ApiProperty({
    description: '구매 담당자',
    example: '이구매',
    required: false
  })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: '구매 담당자를 입력해주세요.' })
  purchaser?: string;

  @ApiProperty({
    description: '결제 조건',
    example: '선불',
    required: false
  })
  @IsOptional()
  @IsString()
  paymentTerms?: string;

  @ApiProperty({
    description: '배송 주소',
    example: '경기도 안양시 동안구 시민대로 123',
    required: false
  })
  @IsOptional()
  @IsString()
  deliveryAddress?: string;

  @ApiProperty({
    description: '특별 요구사항',
    example: '품질 보증서 필수',
    required: false
  })
  @IsOptional()
  @IsString()
  specialRequirements?: string;

  @ApiProperty({
    description: '기타 메모',
    example: '정기 주문',
    required: false
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
