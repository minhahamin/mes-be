import { IsString, IsNumber, IsPositive, IsDateString, MinLength, IsIn, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    description: '고객 ID',
    example: 'CUST001',
    required: true
  })
  @IsString()
  @MinLength(1, { message: '고객 ID를 입력해주세요.' })
  customerId: string;

  @ApiProperty({
    description: '고객명',
    example: '삼성전자',
    required: true
  })
  @IsString()
  @MinLength(1, { message: '고객명을 입력해주세요.' })
  customerName: string;

  @ApiProperty({
    description: '품목 코드',
    example: 'PROD001',
    required: true
  })
  @IsString()
  @MinLength(1, { message: '품목 코드를 입력해주세요.' })
  productCode: string;

  @ApiProperty({
    description: '품목명',
    example: '스마트폰 케이스',
    required: true
  })
  @IsString()
  @MinLength(1, { message: '품목명을 입력해주세요.' })
  productName: string;

  @ApiProperty({
    description: '주문 수량',
    example: 1000,
    type: 'number'
  })
  @IsNumber({}, { message: '주문 수량은 숫자여야 합니다.' })
  @IsPositive({ message: '주문 수량은 양수여야 합니다.' })
  orderQuantity: number;

  @ApiProperty({
    description: '단가',
    example: 15000,
    type: 'number'
  })
  @IsNumber({}, { message: '단가는 숫자여야 합니다.' })
  @IsPositive({ message: '단가는 양수여야 합니다.' })
  unitPrice: number;

  @ApiProperty({
    description: '주문일',
    example: '2024-01-15',
    format: 'date'
  })
  @IsDateString({}, { message: '올바른 날짜 형식을 입력해주세요.' })
  orderDate: string;

  @ApiProperty({
    description: '납기일',
    example: '2024-02-15',
    format: 'date',
    required: false
  })
  @IsOptional()
  @IsDateString({}, { message: '올바른 날짜 형식을 입력해주세요.' })
  deliveryDate?: string;

  @ApiProperty({
    description: '주문 상태',
    example: 'confirmed',
    enum: ['pending', 'confirmed', 'in_production', 'completed', 'cancelled'],
    required: true
  })
  @IsString()
  @IsIn(['pending', 'confirmed', 'in_production', 'completed', 'cancelled'], { 
    message: '주문 상태는 pending, confirmed, in_production, completed, cancelled 중 하나여야 합니다.' 
  })
  status: string;

  @ApiProperty({
    description: '우선순위',
    example: 'high',
    enum: ['low', 'normal', 'high', 'urgent'],
    required: true
  })
  @IsString()
  @IsIn(['low', 'normal', 'high', 'urgent'], { 
    message: '우선순위는 low, normal, high, urgent 중 하나여야 합니다.' 
  })
  priority: string;

  @ApiProperty({
    description: '영업 담당자',
    example: '김영업',
    required: true
  })
  @IsString()
  @MinLength(1, { message: '영업 담당자를 입력해주세요.' })
  salesPerson: string;

  @ApiProperty({
    description: '결제 조건',
    example: '계산서 발행 후 30일',
    required: false
  })
  @IsOptional()
  @IsString()
  paymentTerms?: string;

  @ApiProperty({
    description: '배송 주소',
    example: '경기도 수원시 영통구 삼성로 129',
    required: false
  })
  @IsOptional()
  @IsString()
  shippingAddress?: string;

  @ApiProperty({
    description: '특별 지시사항',
    example: '품질 검사 강화 필요',
    required: false
  })
  @IsOptional()
  @IsString()
  specialInstructions?: string;

  @ApiProperty({
    description: '기타 메모',
    example: 'VIP 고객 주문',
    required: false
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
