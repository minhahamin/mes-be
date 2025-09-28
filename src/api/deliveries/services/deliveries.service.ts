import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Delivery } from '../entities/delivery.entity';
import { CreateDeliveryDto } from '../dto/create-delivery.dto';
import { UpdateDeliveryDto } from '../dto/update-delivery.dto';

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectRepository(Delivery)
    private deliveryRepository: Repository<Delivery>,
  ) {}

  async create(createDeliveryDto: CreateDeliveryDto): Promise<Delivery> {
    // 자동증가 납품 ID 생성
    const totalCount = await this.deliveryRepository.count();
    const nextDeliveryId = `DEL${String(totalCount + 1).padStart(3, '0')}`;

    const delivery = this.deliveryRepository.create({
      ...createDeliveryDto,
      deliveryId: nextDeliveryId,
    });

    return await this.deliveryRepository.save(delivery);
  }

  async findAll(): Promise<Delivery[]> {
    return await this.deliveryRepository.find({
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: number): Promise<Delivery> {
    const delivery = await this.deliveryRepository.findOne({
      where: { id }
    });

    if (!delivery) {
      throw new NotFoundException('해당 납품을 찾을 수 없습니다.');
    }

    return delivery;
  }

  async update(id: number, updateDeliveryDto: UpdateDeliveryDto): Promise<Delivery> {
    const delivery = await this.findOne(id);

    Object.assign(delivery, updateDeliveryDto);

    return await this.deliveryRepository.save(delivery);
  }

  async remove(id: number): Promise<void> {
    const delivery = await this.findOne(id);
    await this.deliveryRepository.remove(delivery);
  }

  // 상태별 납품 조회
  async findByStatus(status: string): Promise<Delivery[]> {
    return await this.deliveryRepository.find({
      where: { status },
      order: { createdAt: 'DESC' }
    });
  }

  // 고객별 납품 조회
  async findByCustomer(customerName: string): Promise<Delivery[]> {
    return await this.deliveryRepository.find({
      where: { customerName },
      order: { createdAt: 'DESC' }
    });
  }

  // 출하 ID별 납품 조회
  async findByShipmentId(shipmentId: string): Promise<Delivery[]> {
    return await this.deliveryRepository.find({
      where: { shipmentId },
      order: { createdAt: 'DESC' }
    });
  }

  // 배송기사별 납품 조회
  async findByDriver(driver: string): Promise<Delivery[]> {
    return await this.deliveryRepository.find({
      where: { driver },
      order: { createdAt: 'DESC' }
    });
  }

  // 우선순위별 납품 조회
  async findByPriority(priority: string): Promise<Delivery[]> {
    return await this.deliveryRepository.find({
      where: { priority },
      order: { createdAt: 'DESC' }
    });
  }

  // 차량별 납품 조회
  async findByVehicle(vehicle: string): Promise<Delivery[]> {
    return await this.deliveryRepository.find({
      where: { vehicle },
      order: { createdAt: 'DESC' }
    });
  }

  // 납품일 범위별 조회
  async findByDeliveryDateRange(startDate: string, endDate: string): Promise<Delivery[]> {
    return await this.deliveryRepository
      .createQueryBuilder('delivery')
      .where('delivery.deliveryDate BETWEEN :startDate AND :endDate', { startDate, endDate })
      .orderBy('delivery.deliveryDate', 'ASC')
      .getMany();
  }

  // 오늘 납품 예정 조회
  async findTodayDeliveries(): Promise<Delivery[]> {
    const today = new Date().toISOString().split('T')[0];
    return await this.deliveryRepository
      .createQueryBuilder('delivery')
      .where('delivery.deliveryDate = :today', { today })
      .orderBy('delivery.expectedTime', 'ASC')
      .getMany();
  }

  // 납품 상태 업데이트
  async updateStatus(id: number, status: string): Promise<Delivery> {
    const delivery = await this.findOne(id);
    delivery.status = status;
    return await this.deliveryRepository.save(delivery);
  }

  // 배송기사 배정
  async assignDriver(id: number, driver: string, vehicle?: string): Promise<Delivery> {
    const delivery = await this.findOne(id);
    delivery.driver = driver;
    if (vehicle) {
      delivery.vehicle = vehicle;
    }
    return await this.deliveryRepository.save(delivery);
  }

  // 납품 완료 처리
  async completeDelivery(id: number, notes?: string): Promise<Delivery> {
    const delivery = await this.findOne(id);
    delivery.status = 'delivered';
    if (notes) {
      delivery.notes = notes;
    }
    return await this.deliveryRepository.save(delivery);
  }
}
