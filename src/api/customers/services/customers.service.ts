import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    // 사업자번호 중복 확인
    const existingCustomer = await this.customersRepository.findOne({
      where: { businessNumber: createCustomerDto.businessNumber }
    });
    
    if (existingCustomer) {
      throw new ConflictException('이미 등록된 사업자번호입니다.');
    }

    // 거래처명 중복 확인
    const existingCustomerName = await this.customersRepository.findOne({
      where: { customerName: createCustomerDto.customerName }
    });
    
    if (existingCustomerName) {
      throw new ConflictException('이미 등록된 거래처명입니다.');
    }

    const customer = this.customersRepository.create(createCustomerDto);
    return this.customersRepository.save(customer);
  }

  async findAll(): Promise<Customer[]> {
    return this.customersRepository.find({
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customersRepository.findOne({ where: { id } });
    if (!customer) {
      throw new NotFoundException(`ID ${id}에 해당하는 거래처를 찾을 수 없습니다.`);
    }
    return customer;
  }

  async findByBusinessNumber(businessNumber: string): Promise<Customer | null> {
    return this.customersRepository.findOne({ where: { businessNumber } });
  }

  async findByCustomerName(customerName: string): Promise<Customer | null> {
    return this.customersRepository.findOne({ where: { customerName } });
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.findOne(id);
    
    // 사업자번호 변경 시 중복 확인
    if (updateCustomerDto.businessNumber && updateCustomerDto.businessNumber !== customer.businessNumber) {
      const existingCustomer = await this.findByBusinessNumber(updateCustomerDto.businessNumber);
      if (existingCustomer) {
        throw new ConflictException('이미 등록된 사업자번호입니다.');
      }
    }

    // 거래처명 변경 시 중복 확인
    if (updateCustomerDto.customerName && updateCustomerDto.customerName !== customer.customerName) {
      const existingCustomer = await this.findByCustomerName(updateCustomerDto.customerName);
      if (existingCustomer) {
        throw new ConflictException('이미 등록된 거래처명입니다.');
      }
    }

    Object.assign(customer, updateCustomerDto);
    return this.customersRepository.save(customer);
  }

  async remove(id: number): Promise<void> {
    const customer = await this.findOne(id);
    await this.customersRepository.remove(customer);
  }
}
