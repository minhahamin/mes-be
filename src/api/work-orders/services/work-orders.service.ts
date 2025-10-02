import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkOrder } from '../entities/work-order.entity';
import { CreateWorkOrderDto } from '../dto/create-work-order.dto';
import { UpdateWorkOrderDto } from '../dto/update-work-order.dto';

@Injectable()
export class WorkOrdersService {
  constructor(
    @InjectRepository(WorkOrder)
    private workOrderRepository: Repository<WorkOrder>,
  ) {}

  async create(createWorkOrderDto: CreateWorkOrderDto): Promise<WorkOrder> {
    // 자동증가 작업지시 ID 생성
    const totalCount = await this.workOrderRepository.count();
    const nextOrderId = `ORDER2024${String(totalCount + 1).padStart(3, '0')}`;

    const workOrder = this.workOrderRepository.create({
      ...createWorkOrderDto,
      orderId: nextOrderId,
    });

    return await this.workOrderRepository.save(workOrder);
  }

  async findAll(): Promise<WorkOrder[]> {
    return await this.workOrderRepository.find({
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: number): Promise<WorkOrder> {
    const workOrder = await this.workOrderRepository.findOne({
      where: { id }
    });

    if (!workOrder) {
      throw new NotFoundException('해당 생산지시를 찾을 수 없습니다.');
    }

    return workOrder;
  }

  async update(id: number, updateWorkOrderDto: UpdateWorkOrderDto): Promise<WorkOrder> {
    const workOrder = await this.findOne(id);

    Object.assign(workOrder, updateWorkOrderDto);

    return await this.workOrderRepository.save(workOrder);
  }

  async remove(id: number): Promise<void> {
    const workOrder = await this.findOne(id);
    await this.workOrderRepository.remove(workOrder);
  }

  // 상태별 생산지시 조회
  async findByStatus(status: string): Promise<WorkOrder[]> {
    return await this.workOrderRepository.find({
      where: { status },
      order: { createdAt: 'DESC' }
    });
  }

  // 제품별 생산지시 조회
  async findByProductCode(productCode: string): Promise<WorkOrder[]> {
    return await this.workOrderRepository.find({
      where: { productCode },
      order: { createdAt: 'DESC' }
    });
  }

  // 생산계획별 생산지시 조회
  async findByPlanId(planId: string): Promise<WorkOrder[]> {
    return await this.workOrderRepository.find({
      where: { planId },
      order: { createdAt: 'DESC' }
    });
  }

  // 작업장별 생산지시 조회
  async findByWorkCenter(workCenter: string): Promise<WorkOrder[]> {
    return await this.workOrderRepository.find({
      where: { workCenter },
      order: { startDate: 'ASC' }
    });
  }

  // 감독자별 생산지시 조회
  async findBySupervisor(supervisor: string): Promise<WorkOrder[]> {
    return await this.workOrderRepository.find({
      where: { supervisor },
      order: { createdAt: 'DESC' }
    });
  }

  // 작업자별 생산지시 조회
  async findByOperator(operator: string): Promise<WorkOrder[]> {
    return await this.workOrderRepository.find({
      where: { operator },
      order: { createdAt: 'DESC' }
    });
  }

  // 우선순위별 생산지시 조회
  async findByPriority(priority: string): Promise<WorkOrder[]> {
    return await this.workOrderRepository.find({
      where: { priority },
      order: { startDate: 'ASC' }
    });
  }

  // 작업일 범위별 조회
  async findByDateRange(startDate: string, endDate: string): Promise<WorkOrder[]> {
    return await this.workOrderRepository
      .createQueryBuilder('workOrder')
      .where('workOrder.startDate BETWEEN :startDate AND :endDate', { startDate, endDate })
      .orderBy('workOrder.startDate', 'ASC')
      .getMany();
  }

  // 진행중인 생산지시 조회
  async findInProgress(): Promise<WorkOrder[]> {
    return await this.workOrderRepository.find({
      where: { status: 'in_progress' },
      order: { priority: 'DESC', startDate: 'ASC' }
    });
  }

  // 대기중인 생산지시 조회
  async findPending(): Promise<WorkOrder[]> {
    return await this.workOrderRepository.find({
      where: { status: 'pending' },
      order: { priority: 'DESC', startDate: 'ASC' }
    });
  }

  // 완료된 생산지시 조회
  async findCompleted(): Promise<WorkOrder[]> {
    return await this.workOrderRepository.find({
      where: { status: 'completed' },
      order: { endDate: 'DESC' }
    });
  }

  // 오늘 작업 예정 조회
  async findTodayWorkOrders(): Promise<WorkOrder[]> {
    const today = new Date().toISOString().split('T')[0];
    return await this.workOrderRepository
      .createQueryBuilder('workOrder')
      .where('workOrder.startDate <= :today', { today })
      .andWhere('workOrder.endDate >= :today', { today })
      .andWhere('workOrder.status IN (:...statuses)', { statuses: ['pending', 'in_progress'] })
      .orderBy('workOrder.priority', 'DESC')
      .addOrderBy('workOrder.startDate', 'ASC')
      .getMany();
  }

  // 생산지시 상태 업데이트
  async updateStatus(id: number, status: string): Promise<WorkOrder> {
    const workOrder = await this.findOne(id);
    workOrder.status = status;
    return await this.workOrderRepository.save(workOrder);
  }

  // 작업 시작
  async startWork(id: number): Promise<WorkOrder> {
    const workOrder = await this.findOne(id);
    workOrder.status = 'in_progress';
    return await this.workOrderRepository.save(workOrder);
  }

  // 작업 완료
  async completeWork(id: number, actualHours?: number): Promise<WorkOrder> {
    const workOrder = await this.findOne(id);
    workOrder.status = 'completed';
    if (actualHours !== undefined) {
      workOrder.actualHours = actualHours;
    }
    return await this.workOrderRepository.save(workOrder);
  }

  // 작업 보류
  async holdWork(id: number, notes?: string): Promise<WorkOrder> {
    const workOrder = await this.findOne(id);
    workOrder.status = 'on_hold';
    if (notes) {
      workOrder.notes = notes;
    }
    return await this.workOrderRepository.save(workOrder);
  }

  // 실제 작업시간 업데이트
  async updateActualHours(id: number, actualHours: number): Promise<WorkOrder> {
    const workOrder = await this.findOne(id);
    workOrder.actualHours = actualHours;
    return await this.workOrderRepository.save(workOrder);
  }

  // 작업자 배정
  async assignOperator(id: number, operator: string): Promise<WorkOrder> {
    const workOrder = await this.findOne(id);
    workOrder.operator = operator;
    return await this.workOrderRepository.save(workOrder);
  }

  // 감독자 배정
  async assignSupervisor(id: number, supervisor: string): Promise<WorkOrder> {
    const workOrder = await this.findOne(id);
    workOrder.supervisor = supervisor;
    return await this.workOrderRepository.save(workOrder);
  }

  // 작업장 배정
  async assignWorkCenter(id: number, workCenter: string): Promise<WorkOrder> {
    const workOrder = await this.findOne(id);
    workOrder.workCenter = workCenter;
    return await this.workOrderRepository.save(workOrder);
  }

  // 우선순위 변경
  async changePriority(id: number, priority: string): Promise<WorkOrder> {
    const workOrder = await this.findOne(id);
    workOrder.priority = priority;
    return await this.workOrderRepository.save(workOrder);
  }
}
