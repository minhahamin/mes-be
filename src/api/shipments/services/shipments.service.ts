import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipment } from '../entities/shipment.entity';
import { CreateShipmentDto } from '../dto/create-shipment.dto';
import { UpdateShipmentDto } from '../dto/update-shipment.dto';

@Injectable()
export class ShipmentsService {
  constructor(
    @InjectRepository(Shipment)
    private shipmentRepository: Repository<Shipment>,
  ) {}

  async create(createShipmentDto: CreateShipmentDto): Promise<Shipment> {
    // 자동증가 출하 ID 생성
    const totalCount = await this.shipmentRepository.count();
    const nextShipmentId = `SH${String(totalCount + 1).padStart(3, '0')}`;

    const shipment = this.shipmentRepository.create({
      ...createShipmentDto,
      shipmentId: nextShipmentId,
    });

    return await this.shipmentRepository.save(shipment);
  }

  async findAll(): Promise<Shipment[]> {
    return await this.shipmentRepository.find({
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: number): Promise<Shipment> {
    const shipment = await this.shipmentRepository.findOne({
      where: { id }
    });

    if (!shipment) {
      throw new NotFoundException('해당 출하를 찾을 수 없습니다.');
    }

    return shipment;
  }

  async update(id: number, updateShipmentDto: UpdateShipmentDto): Promise<Shipment> {
    const shipment = await this.findOne(id);

    Object.assign(shipment, updateShipmentDto);

    return await this.shipmentRepository.save(shipment);
  }

  async remove(id: number): Promise<void> {
    const shipment = await this.findOne(id);
    await this.shipmentRepository.remove(shipment);
  }

  // 상태별 출하 조회
  async findByStatus(status: string): Promise<Shipment[]> {
    return await this.shipmentRepository.find({
      where: { status },
      order: { createdAt: 'DESC' }
    });
  }

  // 고객별 출하 조회
  async findByCustomer(customerName: string): Promise<Shipment[]> {
    return await this.shipmentRepository.find({
      where: { customerName },
      order: { createdAt: 'DESC' }
    });
  }

  // 수주 ID별 출하 조회
  async findByOrderId(orderId: string): Promise<Shipment[]> {
    return await this.shipmentRepository.find({
      where: { orderId },
      order: { createdAt: 'DESC' }
    });
  }

  // 담당자별 출하 조회
  async findByResponsiblePerson(responsiblePerson: string): Promise<Shipment[]> {
    return await this.shipmentRepository.find({
      where: { responsiblePerson },
      order: { createdAt: 'DESC' }
    });
  }

  // 우선순위별 출하 조회
  async findByPriority(priority: string): Promise<Shipment[]> {
    return await this.shipmentRepository.find({
      where: { priority },
      order: { createdAt: 'DESC' }
    });
  }

  // 운송업체별 출하 조회
  async findByCarrier(carrier: string): Promise<Shipment[]> {
    return await this.shipmentRepository.find({
      where: { carrier },
      order: { createdAt: 'DESC' }
    });
  }

  // 출하일 범위별 조회
  async findByShipmentDateRange(startDate: string, endDate: string): Promise<Shipment[]> {
    return await this.shipmentRepository
      .createQueryBuilder('shipment')
      .where('shipment.shipmentDate BETWEEN :startDate AND :endDate', { startDate, endDate })
      .orderBy('shipment.shipmentDate', 'ASC')
      .getMany();
  }

  // 배송예정일 범위별 조회
  async findByDeliveryDateRange(startDate: string, endDate: string): Promise<Shipment[]> {
    return await this.shipmentRepository
      .createQueryBuilder('shipment')
      .where('shipment.expectedDeliveryDate BETWEEN :startDate AND :endDate', { startDate, endDate })
      .orderBy('shipment.expectedDeliveryDate', 'ASC')
      .getMany();
  }

  // 출하 상태 업데이트
  async updateStatus(id: number, status: string): Promise<Shipment> {
    const shipment = await this.findOne(id);
    shipment.status = status;
    return await this.shipmentRepository.save(shipment);
  }

  // 추적번호 업데이트
  async updateTrackingNumber(id: number, trackingNumber: string, carrier?: string): Promise<Shipment> {
    const shipment = await this.findOne(id);
    shipment.trackingNumber = trackingNumber;
    if (carrier) {
      shipment.carrier = carrier;
    }
    return await this.shipmentRepository.save(shipment);
  }
}
