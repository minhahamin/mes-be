import { IsString, IsNumber, IsDateString, IsOptional, IsEnum } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateShipmentDto {
  @ApiPropertyOptional({ description: '출하 ID (자동 생성)', example: 'SH001' })
  @IsOptional()
  @IsString()
  shipmentId?: string;

  @ApiProperty({ description: '수주 ID', example: 'ORDER2024004' })
  @IsString()
  orderId: string;

  @ApiProperty({ description: '고객명', example: 'SK하이닉스' })
  @IsString()
  customerName: string;

  @ApiProperty({ description: '제품 코드', example: 'PROD004' })
  @IsString()
  productCode: string;

  @ApiProperty({ description: '제품명', example: '노트북 스탠드' })
  @IsString()
  productName: string;

  @ApiProperty({ description: '출하 수량', example: 300 })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  quantity: number;

  @ApiProperty({ description: '출하일', example: '2024-01-30' })
  @IsDateString()
  shipmentDate: string;

  @ApiPropertyOptional({ description: '배송예정일', example: '2024-02-05' })
  @IsOptional()
  @IsDateString()
  expectedDeliveryDate?: string;

  @ApiPropertyOptional({ 
    description: '출하 상태', 
    enum: ['preparing', 'shipped', 'in_transit', 'delivered', 'cancelled'],
    example: 'preparing'
  })
  @IsOptional()
  @IsEnum(['preparing', 'shipped', 'in_transit', 'delivered', 'cancelled'])
  status?: string;

  @ApiPropertyOptional({ 
    description: '우선순위', 
    enum: ['low', 'normal', 'high', 'urgent'],
    example: 'low'
  })
  @IsOptional()
  @IsEnum(['low', 'normal', 'high', 'urgent'])
  priority?: string;

  @ApiPropertyOptional({ description: '운송업체', example: 'CJ대한통운' })
  @IsOptional()
  @IsString()
  carrier?: string;

  @ApiPropertyOptional({ description: '추적번호', example: '5566778899' })
  @IsOptional()
  @IsString()
  trackingNumber?: string;

  @ApiPropertyOptional({ description: '배송주소', example: '경기도 이천시 부발읍 공단로 209' })
  @IsOptional()
  @IsString()
  shippingAddress?: string;

  @ApiPropertyOptional({ description: '배송비', example: 15000 })
  @IsOptional()
  @Transform(({ value }) => value ? parseFloat(value) : value)
  @IsNumber()
  shippingCost?: number;

  @ApiProperty({ description: '담당자', example: '최출하' })
  @IsString()
  responsiblePerson: string;

  @ApiPropertyOptional({ description: '메모', example: 'ORDER2024004 수주 기반 출하 준비중 - 노트북 스탠드 300개' })
  @IsOptional()
  @IsString()
  notes?: string;
}
