import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from '../entities/company.entity';
import { CreateCompanyDto } from '../dto/create-company.dto';
import { UpdateCompanyDto } from '../dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companiesRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    // 사업자번호 중복 확인
    const existingCompany = await this.companiesRepository.findOne({
      where: { businessNumber: createCompanyDto.businessNumber }
    });
    
    if (existingCompany) {
      throw new ConflictException('이미 등록된 사업자번호입니다.');
    }

    const company = this.companiesRepository.create(createCompanyDto);
    return this.companiesRepository.save(company);
  }

  async findAll(): Promise<Company[]> {
    return this.companiesRepository.find({
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: number): Promise<Company> {
    const company = await this.companiesRepository.findOne({ where: { id } });
    if (!company) {
      throw new NotFoundException(`ID ${id}에 해당하는 회사를 찾을 수 없습니다.`);
    }
    return company;
  }

  async findByBusinessNumber(businessNumber: string): Promise<Company | null> {
    return this.companiesRepository.findOne({ where: { businessNumber } });
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    const company = await this.findOne(id);
    
    // 사업자번호 변경 시 중복 확인
    if (updateCompanyDto.businessNumber && updateCompanyDto.businessNumber !== company.businessNumber) {
      const existingCompany = await this.findByBusinessNumber(updateCompanyDto.businessNumber);
      if (existingCompany) {
        throw new ConflictException('이미 등록된 사업자번호입니다.');
      }
    }

    Object.assign(company, updateCompanyDto);
    return this.companiesRepository.save(company);
  }

  async remove(id: number): Promise<void> {
    const company = await this.findOne(id);
    await this.companiesRepository.remove(company);
  }
}
