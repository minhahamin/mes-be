import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UpdateOrderDto } from '../dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // 자동증가 주문 ID 생성
    const totalCount = await this.orderRepository.count();
    const nextOrderId = `ORDER2024${String(totalCount + 1).padStart(3, '0')}`;

    // 총 금액 계산
    const totalAmount = createOrderDto.orderQuantity * createOrderDto.unitPrice;

    const order = this.orderRepository.create({
      ...createOrderDto,
      orderId: nextOrderId,
      totalAmount: totalAmount,
    });

    return await this.orderRepository.save(order);
  }

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id }
    });

    if (!order) {
      throw new NotFoundException('해당 수주를 찾을 수 없습니다.');
    }

    return order;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.findOne(id);

    // 총 금액 재계산 (수량이나 단가가 변경된 경우)
    const orderQuantity = updateOrderDto.orderQuantity || order.orderQuantity;
    const unitPrice = updateOrderDto.unitPrice || order.unitPrice;
    const totalAmount = orderQuantity * unitPrice;

    Object.assign(order, {
      ...updateOrderDto,
      totalAmount: totalAmount,
    });

    return await this.orderRepository.save(order);
  }

  async remove(id: number): Promise<void> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
  }

  // 상태별 수주 조회
  async findByStatus(status: string): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { status },
      order: { createdAt: 'DESC' }
    });
  }

  // 고객별 수주 조회
  async findByCustomer(customerId: string): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { customerId },
      order: { createdAt: 'DESC' }
    });
  }

  // 영업 담당자별 수주 조회
  async findBySalesPerson(salesPerson: string): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { salesPerson },
      order: { createdAt: 'DESC' }
    });
  }

  // 우선순위별 수주 조회
  async findByPriority(priority: string): Promise<Order[]> {
    return await this.orderRepository.find({
      where: { priority },
      order: { createdAt: 'DESC' }
    });
  }

  // 날짜 범위별 수주 조회
  async findByDateRange(startDate: string, endDate: string): Promise<Order[]> {
    return await this.orderRepository
      .createQueryBuilder('order')
      .where('order.orderDate BETWEEN :startDate AND :endDate', { startDate, endDate })
      .orderBy('order.orderDate', 'ASC')
      .getMany();
  }
}
