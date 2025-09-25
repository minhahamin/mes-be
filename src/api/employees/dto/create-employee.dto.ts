import { IsString, IsEmail, IsDateString, MinLength, Matches, IsNumber, IsPositive, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {

  @ApiProperty({
    description: '직원명',
    example: '김민하',
    required: true
  })
  @IsString()
  @MinLength(1, { message: '직원명을 입력해주세요.' })
  name: string;

  @ApiProperty({
    description: '부서',
    example: '생산관리부',
    required: true
  })
  @IsString()
  @MinLength(1, { message: '부서를 입력해주세요.' })
  department: string;

  @ApiProperty({
    description: '직급',
    example: '팀장',
    required: true
  })
  @IsString()
  @MinLength(1, { message: '직급을 입력해주세요.' })
  position: string;

  @ApiProperty({
    description: '전화번호',
    example: '010-1234-5678',
    pattern: '^\\d{2,3}-\\d{3,4}-\\d{4}$'
  })
  @IsString()
  @Matches(/^\d{2,3}-\d{3,4}-\d{4}$/, { message: '전화번호는 010-0000-0000 형식으로 입력해주세요.' })
  phone: string;

  @ApiProperty({
    description: '이메일',
    example: 'minha.kim@company.com',
    format: 'email'
  })
  @IsEmail({}, { message: '올바른 이메일 형식을 입력해주세요.' })
  email: string;

  @ApiProperty({
    description: '입사일',
    example: '2020-03-01',
    format: 'date'
  })
  @IsDateString({}, { message: '올바른 날짜 형식을 입력해주세요.' })
  hireDate: string;

  @ApiProperty({
    description: '급여',
    example: 4500000,
    type: 'number'
  })
  @IsNumber({}, { message: '급여는 숫자여야 합니다.' })
  @IsPositive({ message: '급여는 양수여야 합니다.' })
  salary: number;

  @ApiProperty({
    description: '상태',
    example: 'active',
    enum: ['active', 'inactive', 'resigned'],
    required: true
  })
  @IsString()
  @IsIn(['active', 'inactive', 'resigned'], { message: '상태는 active, inactive, resigned 중 하나여야 합니다.' })
  status: string;

  @ApiProperty({
    description: '주소',
    example: '서울시 강남구 테헤란로 123',
    required: true
  })
  @IsString()
  @MinLength(1, { message: '주소를 입력해주세요.' })
  address: string;

  @ApiProperty({
    description: '비상연락처',
    example: '김영희',
    required: true
  })
  @IsString()
  @MinLength(1, { message: '비상연락처를 입력해주세요.' })
  emergencyContact: string;

  @ApiProperty({
    description: '비상연락처 전화번호',
    example: '010-9876-5432',
    pattern: '^\\d{2,3}-\\d{3,4}-\\d{4}$'
  })
  @IsString()
  @Matches(/^\d{2,3}-\d{3,4}-\d{4}$/, { message: '비상연락처 전화번호는 010-0000-0000 형식으로 입력해주세요.' })
  emergencyPhone: string;
}
