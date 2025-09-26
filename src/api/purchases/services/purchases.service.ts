import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from '../entities/purchase.entity';
import { CreatePurchaseDto } from '../dto/create-purchase.dto';
import { UpdatePurchaseDto } from '../dto/update-purchase.dto';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
  ) {}

  async create(createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    // 자동증가 발주 ID 생성
    const totalCount = await this.purchaseRepository.count();
    const nextOrderId = `PO2024${String(totalCount + 1).padStart(3, '0')}`;

    // 총 금액 계산
    const totalAmount = createPurchaseDto.orderQuantity * createPurchaseDto.unitPrice;

    const purchase = this.purchaseRepository.create({
      ...createPurchaseDto,
      orderId: nextOrderId,
      totalAmount: totalAmount,
    });

    return await this.purchaseRepository.save(purchase);
  }

  async findAll(): Promise<Purchase[]> {
    return await this.purchaseRepository.find({
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: number): Promise<Purchase> {
    const purchase = await this.purchaseRepository.findOne({
      where: { id }
    });

    if (!purchase) {
      throw new NotFoundException('해당 발주를 찾을 수 없습니다.');
    }

    return purchase;
  }

  async update(id: number, updatePurchaseDto: UpdatePurchaseDto): Promise<Purchase> {
    const purchase = await this.findOne(id);

    // 총 금액 재계산 (수량이나 단가가 변경된 경우)
    const orderQuantity = updatePurchaseDto.orderQuantity || purchase.orderQuantity;
    const unitPrice = updatePurchaseDto.unitPrice || purchase.unitPrice;
    const totalAmount = orderQuantity * unitPrice;

    Object.assign(purchase, {
      ...updatePurchaseDto,
      totalAmount: totalAmount,
    });

    return await this.purchaseRepository.save(purchase);
  }

  async remove(id: number): Promise<void> {
    const purchase = await this.findOne(id);
    await this.purchaseRepository.remove(purchase);
  }

  // 상태별 발주 조회
  async findByStatus(status: string): Promise<Purchase[]> {
    return await this.purchaseRepository.find({
      where: { status },
      order: { createdAt: 'DESC' }
    });
  }

  // 공급업체별 발주 조회
  async findBySupplier(supplierId: string): Promise<Purchase[]> {
    return await this.purchaseRepository.find({
      where: { supplierId },
      order: { createdAt: 'DESC' }
    });
  }

  // 구매 담당자별 발주 조회
  async findByPurchaser(purchaser: string): Promise<Purchase[]> {
    return await this.purchaseRepository.find({
      where: { purchaser },
      order: { createdAt: 'DESC' }
    });
  }

  // 우선순위별 발주 조회
  async findByPriority(priority: string): Promise<Purchase[]> {
    return await this.purchaseRepository.find({
      where: { priority },
      order: { createdAt: 'DESC' }
    });
  }

  // 날짜 범위별 발주 조회
  async findByDateRange(startDate: string, endDate: string): Promise<Purchase[]> {
    return await this.purchaseRepository
      .createQueryBuilder('purchase')
      .where('purchase.orderDate BETWEEN :startDate AND :endDate', { startDate, endDate })
      .orderBy('purchase.orderDate', 'ASC')
      .getMany();
  }
}
