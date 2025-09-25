import { IsString, IsEmail, IsDateString, MinLength, Matches, IsNumber, IsPositive, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCustomerDto {
  @ApiProperty({
    description: '거래처명',
    example: 'ABC 제조업체',
    required: false
  })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: '거래처명을 입력해주세요.' })
  customerName?: string;

  @ApiProperty({
    description: '담당자명',
    example: '이영희',
    required: false
  })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: '담당자명을 입력해주세요.' })
  contactPerson?: string;

  @ApiProperty({
    description: '전화번호',
    example: '02-9876-5432',
    pattern: '^\\d{2,3}-\\d{3,4}-\\d{4}$',
    required: false
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d{2,3}-\d{3,4}-\d{4}$/, { message: '전화번호는 02-0000-0000 형식으로 입력해주세요.' })
  phone?: string;

  @ApiProperty({
    description: '이메일',
    example: 'contact@abcmanufacturing.co.kr',
    format: 'email',
    required: false
  })
  @IsOptional()
  @IsEmail({}, { message: '올바른 이메일 형식을 입력해주세요.' })
  email?: string;

  @ApiProperty({
    description: '주소',
    example: '부산시 해운대구 센텀중앙로 456',
    required: false
  })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: '주소를 입력해주세요.' })
  address?: string;

  @ApiProperty({
    description: '사업자번호',
    example: '987-65-43210',
    pattern: '^\\d{3}-\\d{2}-\\d{5}$',
    required: false
  })
  @IsOptional()
  @IsString()
  @Matches(/^\d{3}-\d{2}-\d{5}$/, { message: '사업자번호는 000-00-00000 형식으로 입력해주세요.' })
  businessNumber?: string;

  @ApiProperty({
    description: '업종',
    example: '자동차부품',
    required: false
  })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: '업종을 입력해주세요.' })
  industry?: string;

  @ApiProperty({
    description: '신용한도',
    example: 50000000,
    type: 'number',
    required: false
  })
  @IsOptional()
  @IsNumber({}, { message: '신용한도는 숫자여야 합니다.' })
  @IsPositive({ message: '신용한도는 양수여야 합니다.' })
  creditLimit?: number;

  @ApiProperty({
    description: '결제조건',
    example: '30일',
    required: false
  })
  @IsOptional()
  @IsString()
  @MinLength(1, { message: '결제조건을 입력해주세요.' })
  paymentTerms?: string;

  @ApiProperty({
    description: '등록일',
    example: '2023-03-15',
    format: 'date',
    required: false
  })
  @IsOptional()
  @IsDateString({}, { message: '올바른 날짜 형식을 입력해주세요.' })
  registrationDate?: string;
}
