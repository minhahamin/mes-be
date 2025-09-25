import { IsString, IsNumber, IsPositive, MinLength, IsIn, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {

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
    description: '카테고리',
    example: '전자제품',
    required: false
  })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: '카테고리를 입력해주세요.' })
  category?: string;

  @ApiProperty({
    description: '품목 설명',
    example: '고급 실리콘 소재의 스마트폰 보호 케이스',
    required: false
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: '단가',
    example: 25000,
    type: 'number',
    required: false
  })
  @IsOptional()
  @IsNumber({}, { message: '단가는 숫자여야 합니다.' })
  @IsPositive({ message: '단가는 양수여야 합니다.' })
  unitPrice?: number;

  @ApiProperty({
    description: '원가',
    example: 15000,
    type: 'number',
    required: false
  })
  @IsOptional()
  @IsNumber({}, { message: '원가는 숫자여야 합니다.' })
  @IsPositive({ message: '원가는 양수여야 합니다.' })
  cost?: number;

  @ApiProperty({
    description: '재고 수량',
    example: 150,
    type: 'number',
    required: false
  })
  @IsOptional()
  @IsNumber({}, { message: '재고 수량은 숫자여야 합니다.' })
  stock?: number;

  @ApiProperty({
    description: '최소 재고',
    example: 20,
    type: 'number',
    required: false
  })
  @IsOptional()
  @IsNumber({}, { message: '최소 재고는 숫자여야 합니다.' })
  minStock?: number;

  @ApiProperty({
    description: '최대 재고',
    example: 200,
    type: 'number',
    required: false
  })
  @IsOptional()
  @IsNumber({}, { message: '최대 재고는 숫자여야 합니다.' })
  maxStock?: number;

  @ApiProperty({
    description: '공급업체',
    example: '케이스코리아',
    required: false
  })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: '공급업체를 입력해주세요.' })
  supplier?: string;

  @ApiProperty({
    description: '상태',
    example: 'active',
    enum: ['active', 'inactive', 'discontinued'],
    required: false
  })
  @IsOptional()
  @IsString()
  @IsIn(['active', 'inactive', 'discontinued'], { message: '상태는 active, inactive, discontinued 중 하나여야 합니다.' })
  status?: string;
}
