import { IsString, IsEmail, IsDateString, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({
    description: '회사명',
    example: '삼성전자',
    required: true
  })
  @IsString()
  @MinLength(1, { message: '회사명을 입력해주세요.' })
  companyName: string;

  @ApiProperty({
    description: '사업자번호',
    example: '123-45-67890',
    pattern: '^\\d{3}-\\d{2}-\\d{5}$'
  })
  @IsString()
  @Matches(/^\d{3}-\d{2}-\d{5}$/, { message: '사업자번호는 000-00-00000 형식으로 입력해주세요.' })
  businessNumber: string;

  @ApiProperty({
    description: '대표자명',
    example: '김철수',
    required: true
  })
  @IsString()
  @MinLength(1, { message: '대표자명을 입력해주세요.' })
  ceoName: string;

  @ApiProperty({
    description: '주소',
    example: '서울특별시 강남구 테헤란로 123',
    required: true
  })
  @IsString()
  @MinLength(1, { message: '주소를 입력해주세요.' })
  address: string;

  @ApiProperty({
    description: '전화번호',
    example: '02-1234-5678',
    pattern: '^\\d{2,3}-\\d{3,4}-\\d{4}$'
  })
  @IsString()
  @Matches(/^\d{2,3}-\d{3,4}-\d{4}$/, { message: '전화번호는 02-0000-0000 형식으로 입력해주세요.' })
  phone: string;

  @ApiProperty({
    description: '이메일',
    example: 'contact@company.com',
    format: 'email'
  })
  @IsEmail({}, { message: '올바른 이메일 형식을 입력해주세요.' })
  email: string;

  @ApiProperty({
    description: '업종',
    example: '제조업',
    required: true
  })
  @IsString()
  @MinLength(1, { message: '업종을 입력해주세요.' })
  industry: string;

  @ApiProperty({
    description: '설립일',
    example: '2020-01-01',
    format: 'date'
  })
  @IsDateString({}, { message: '올바른 날짜 형식을 입력해주세요.' })
  establishedDate: string;
}
