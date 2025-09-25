import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    // 이메일 중복 확인
    const existingEmail = await this.employeeRepository.findOne({
      where: { email: createEmployeeDto.email }
    });

    if (existingEmail) {
      throw new ConflictException('이미 등록된 이메일입니다.');
    }

    // 자동증가 직원 ID 생성
    const totalCount = await this.employeeRepository.count();
    const nextEmployeeId = `EMP${String(totalCount + 1).padStart(3, '0')}`;

    const employee = this.employeeRepository.create({
      ...createEmployeeDto,
      employeeId: nextEmployeeId
    });
    return await this.employeeRepository.save(employee);
  }

  async findAll(): Promise<Employee[]> {
    return await this.employeeRepository.find({
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({
      where: { id }
    });

    if (!employee) {
      throw new NotFoundException('해당 직원을 찾을 수 없습니다.');
    }

    return employee;
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const employee = await this.findOne(id);

    // 이메일 중복 확인 (자기 자신 제외)
    if (updateEmployeeDto.email && updateEmployeeDto.email !== employee.email) {
      const existingEmail = await this.employeeRepository.findOne({
        where: { email: updateEmployeeDto.email }
      });

      if (existingEmail) {
        throw new ConflictException('이미 등록된 이메일입니다.');
      }
    }

    Object.assign(employee, updateEmployeeDto);
    return await this.employeeRepository.save(employee);
  }

  async remove(id: number): Promise<void> {
    const employee = await this.findOne(id);
    await this.employeeRepository.remove(employee);
  }
}
