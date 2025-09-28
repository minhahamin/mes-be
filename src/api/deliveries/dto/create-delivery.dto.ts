import { IsString, IsNumber, IsDateString, IsOptional, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDeliveryDto {
  @ApiPropertyOptional({ description: '납품 ID (자동 생성)', example: 'DEL001' })
  @IsOptional()
  @IsString()
  deliveryId?: string;

  @ApiProperty({ description: '출하 ID', example: 'SH004' })
  @IsString()
  shipmentId: string;

  @ApiProperty({ description: '고객명', example: 'SK하이닉스' })
  @IsString()
  customerName: string;

  @ApiProperty({ description: '납품주소', example: '경기도 이천시 부발읍 공단로 209' })
  @IsString()
  deliveryAddress: string;

  @ApiProperty({ description: '납품일', example: '2024-02-05' })
  @IsDateString()
  deliveryDate: string;

  @ApiPropertyOptional({ description: '예상시간', example: '11:00' })
  @IsOptional()
  @IsString()
  expectedTime?: string;

  @ApiPropertyOptional({ 
    description: '납품 상태', 
    enum: ['scheduled', 'in_progress', 'delivered', 'cancelled', 'failed'],
    example: 'scheduled'
  })
  @IsOptional()
  @IsEnum(['scheduled', 'in_progress', 'delivered', 'cancelled', 'failed'])
  status?: string;

  @ApiPropertyOptional({ 
    description: '우선순위', 
    enum: ['low', 'normal', 'high', 'urgent'],
    example: 'low'
  })
  @IsOptional()
  @IsEnum(['low', 'normal', 'high', 'urgent'])
  priority?: string;

  @ApiProperty({ description: '배송기사', example: '최배송' })
  @IsString()
  driver: string;

  @ApiPropertyOptional({ description: '차량정보', example: '중형트럭-004' })
  @IsOptional()
  @IsString()
  vehicle?: string;

  @ApiPropertyOptional({ description: '납품비', example: 15000 })
  @IsOptional()
  @Transform(({ value }) => value ? parseFloat(value) : value)
  @IsNumber()
  deliveryFee?: number;

  @ApiPropertyOptional({ description: '메모', example: 'SH004 출하 기반 납품 예정 - 노트북 스탠드 300개' })
  @IsOptional()
  @IsString()
  notes?: string;
}
