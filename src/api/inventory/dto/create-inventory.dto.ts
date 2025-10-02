import { IsString, IsNumber, IsDateString, IsOptional, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateInventoryDto {
  @ApiProperty({ description: '제품 코드', example: 'PROD001' })
  @IsString()
  productCode: string;

  @ApiProperty({ description: '제품명', example: '스마트폰 케이스' })
  @IsString()
  productName: string;

  @ApiProperty({ description: '카테고리', example: '전자제품' })
  @IsString()
  category: string;

  @ApiPropertyOptional({ description: '현재 재고', example: 150 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  currentStock?: number;

  @ApiPropertyOptional({ description: '최소 재고', example: 20 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  minStock?: number;

  @ApiPropertyOptional({ description: '최대 재고', example: 200 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  maxStock?: number;

  @ApiPropertyOptional({ description: '재주문 시점', example: 30 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  reorderPoint?: number;

  @ApiPropertyOptional({ 
    description: '재고 상태', 
    enum: ['sufficient', 'low', 'out_of_stock', 'excess'],
    example: 'sufficient'
  })
  @IsOptional()
  @IsEnum(['sufficient', 'low', 'out_of_stock', 'excess'])
  status?: string;

  @ApiPropertyOptional({ description: '마지막 업데이트일', example: '2024-01-15' })
  @IsOptional()
  @IsDateString()
  lastUpdated?: string;

  @ApiProperty({ description: '보관 위치', example: 'A-01-01' })
  @IsString()
  location: string;

  @ApiProperty({ description: '공급업체', example: '케이스코리아' })
  @IsString()
  supplier: string;

  @ApiPropertyOptional({ description: '단위 원가', example: 15000 })
  @IsOptional()
  @Transform(({ value }) => value ? parseFloat(value) : value)
  @IsNumber()
  unitCost?: number;

  @ApiPropertyOptional({ description: '총 재고 가치', example: 2250000 })
  @IsOptional()
  @Transform(({ value }) => value ? parseFloat(value) : value)
  @IsNumber()
  totalValue?: number;

  @ApiPropertyOptional({ description: '마지막 이동일', example: '2024-01-15' })
  @IsOptional()
  @IsDateString()
  lastMovementDate?: string;

  @ApiPropertyOptional({ 
    description: '이동 유형', 
    enum: ['in', 'out', 'adjustment', 'transfer', 'return'],
    example: 'in'
  })
  @IsOptional()
  @IsEnum(['in', 'out', 'adjustment', 'transfer', 'return'])
  movementType?: string;

  @ApiPropertyOptional({ description: '이동 수량', example: 50 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  movementQuantity?: number;

  @ApiPropertyOptional({ description: '메모', example: '정상 재고 상태' })
  @IsOptional()
  @IsString()
  notes?: string;
}
