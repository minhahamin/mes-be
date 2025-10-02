import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductionPlan } from '../entities/production-plan.entity';
import { CreateProductionPlanDto } from '../dto/create-production-plan.dto';
import { UpdateProductionPlanDto } from '../dto/update-production-plan.dto';

@Injectable()
export class ProductionPlansService {
  constructor(
    @InjectRepository(ProductionPlan)
    private productionPlanRepository: Repository<ProductionPlan>,
  ) {}

  async create(createProductionPlanDto: CreateProductionPlanDto): Promise<ProductionPlan> {
    // 자동증가 생산계획 ID 생성
    const totalCount = await this.productionPlanRepository.count();
    const nextPlanId = `PLAN2024${String(totalCount + 1).padStart(3, '0')}`;

    const productionPlan = this.productionPlanRepository.create({
      ...createProductionPlanDto,
      planId: nextPlanId,
    });

    return await this.productionPlanRepository.save(productionPlan);
  }

  async findAll(): Promise<ProductionPlan[]> {
    return await this.productionPlanRepository.find({
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: number): Promise<ProductionPlan> {
    const productionPlan = await this.productionPlanRepository.findOne({
      where: { id }
    });

    if (!productionPlan) {
      throw new NotFoundException('해당 생산계획을 찾을 수 없습니다.');
    }

    return productionPlan;
  }

  async update(id: number, updateProductionPlanDto: UpdateProductionPlanDto): Promise<ProductionPlan> {
    const productionPlan = await this.findOne(id);

    Object.assign(productionPlan, updateProductionPlanDto);

    return await this.productionPlanRepository.save(productionPlan);
  }

  async remove(id: number): Promise<void> {
    const productionPlan = await this.findOne(id);
    await this.productionPlanRepository.remove(productionPlan);
  }

  // 상태별 생산계획 조회
  async findByStatus(status: string): Promise<ProductionPlan[]> {
    return await this.productionPlanRepository.find({
      where: { status },
      order: { createdAt: 'DESC' }
    });
  }

  // 제품별 생산계획 조회
  async findByProductCode(productCode: string): Promise<ProductionPlan[]> {
    return await this.productionPlanRepository.find({
      where: { productCode },
      order: { createdAt: 'DESC' }
    });
  }

  // 작업장별 생산계획 조회
  async findByWorkCenter(workCenter: string): Promise<ProductionPlan[]> {
    return await this.productionPlanRepository.find({
      where: { workCenter },
      order: { plannedStartDate: 'ASC' }
    });
  }

  // 담당자별 생산계획 조회
  async findByResponsiblePerson(responsiblePerson: string): Promise<ProductionPlan[]> {
    return await this.productionPlanRepository.find({
      where: { responsiblePerson },
      order: { createdAt: 'DESC' }
    });
  }

  // 우선순위별 생산계획 조회
  async findByPriority(priority: string): Promise<ProductionPlan[]> {
    return await this.productionPlanRepository.find({
      where: { priority },
      order: { plannedStartDate: 'ASC' }
    });
  }

  // 계획일 범위별 조회
  async findByPlannedDateRange(startDate: string, endDate: string): Promise<ProductionPlan[]> {
    return await this.productionPlanRepository
      .createQueryBuilder('plan')
      .where('plan.plannedStartDate BETWEEN :startDate AND :endDate', { startDate, endDate })
      .orderBy('plan.plannedStartDate', 'ASC')
      .getMany();
  }

  // 진행중인 생산계획 조회
  async findInProgress(): Promise<ProductionPlan[]> {
    return await this.productionPlanRepository.find({
      where: { status: 'in_progress' },
      order: { priority: 'DESC', plannedStartDate: 'ASC' }
    });
  }

  // 대기중인 생산계획 조회
  async findPending(): Promise<ProductionPlan[]> {
    return await this.productionPlanRepository.find({
      where: { status: 'pending' },
      order: { priority: 'DESC', plannedStartDate: 'ASC' }
    });
  }

  // 완료된 생산계획 조회
  async findCompleted(): Promise<ProductionPlan[]> {
    return await this.productionPlanRepository.find({
      where: { status: 'completed' },
      order: { actualEndDate: 'DESC' }
    });
  }

  // 생산계획 상태 업데이트
  async updateStatus(id: number, status: string): Promise<ProductionPlan> {
    const productionPlan = await this.findOne(id);
    productionPlan.status = status;
    
    // 상태가 in_progress로 변경되고 실제 시작일이 없으면 현재 날짜로 설정
    if (status === 'in_progress' && !productionPlan.actualStartDate) {
      productionPlan.actualStartDate = new Date();
    }
    
    // 상태가 completed로 변경되고 실제 종료일이 없으면 현재 날짜로 설정
    if (status === 'completed' && !productionPlan.actualEndDate) {
      productionPlan.actualEndDate = new Date();
    }
    
    return await this.productionPlanRepository.save(productionPlan);
  }

  // 생산 시작
  async startProduction(id: number, actualStartDate?: string): Promise<ProductionPlan> {
    const productionPlan = await this.findOne(id);
    productionPlan.status = 'in_progress';
    productionPlan.actualStartDate = actualStartDate ? new Date(actualStartDate) : new Date();
    return await this.productionPlanRepository.save(productionPlan);
  }

  // 생산 완료
  async completeProduction(id: number, actualEndDate?: string, actualHours?: number): Promise<ProductionPlan> {
    const productionPlan = await this.findOne(id);
    productionPlan.status = 'completed';
    productionPlan.actualEndDate = actualEndDate ? new Date(actualEndDate) : new Date();
    if (actualHours !== undefined) {
      productionPlan.actualHours = actualHours;
    }
    return await this.productionPlanRepository.save(productionPlan);
  }

  // 실제 작업시간 업데이트
  async updateActualHours(id: number, actualHours: number): Promise<ProductionPlan> {
    const productionPlan = await this.findOne(id);
    productionPlan.actualHours = actualHours;
    return await this.productionPlanRepository.save(productionPlan);
  }

  // 담당자 배정
  async assignResponsiblePerson(id: number, responsiblePerson: string): Promise<ProductionPlan> {
    const productionPlan = await this.findOne(id);
    productionPlan.responsiblePerson = responsiblePerson;
    return await this.productionPlanRepository.save(productionPlan);
  }

  // 작업장 배정
  async assignWorkCenter(id: number, workCenter: string): Promise<ProductionPlan> {
    const productionPlan = await this.findOne(id);
    productionPlan.workCenter = workCenter;
    return await this.productionPlanRepository.save(productionPlan);
  }
}
