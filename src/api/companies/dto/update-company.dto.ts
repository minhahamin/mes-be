import { IsString, IsEmail, IsDateString, MinLength, Matches, IsOptional } from 'class-validator';

export class UpdateCompanyDto {
  @IsOptional()
  @IsString()
  @MinLength(1, { message: '회사명을 입력해주세요.' })
  companyName?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{3}-\d{2}-\d{5}$/, { message: '사업자번호는 000-00-00000 형식으로 입력해주세요.' })
  businessNumber?: string;

  @IsOptional()
  @IsString()
  @MinLength(1, { message: '대표자명을 입력해주세요.' })
  ceoName?: string;

  @IsOptional()
  @IsString()
  @MinLength(1, { message: '주소를 입력해주세요.' })
  address?: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{2,3}-\d{3,4}-\d{4}$/, { message: '전화번호는 02-0000-0000 형식으로 입력해주세요.' })
  phone?: string;

  @IsOptional()
  @IsEmail({}, { message: '올바른 이메일 형식을 입력해주세요.' })
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(1, { message: '업종을 입력해주세요.' })
  industry?: string;

  @IsOptional()
  @IsDateString({}, { message: '올바른 날짜 형식을 입력해주세요.' })
  establishedDate?: string;
}
