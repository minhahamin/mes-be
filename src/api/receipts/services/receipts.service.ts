import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receipt } from '../entities/receipt.entity';
import { CreateReceiptDto } from '../dto/create-receipt.dto';
import { UpdateReceiptDto } from '../dto/update-receipt.dto';

@Injectable()
export class ReceiptsService {
  constructor(
    @InjectRepository(Receipt)
    private receiptRepository: Repository<Receipt>,
  ) {}

  async create(createReceiptDto: CreateReceiptDto): Promise<Receipt> {
    // 자동증가 입고 ID 생성
    const totalCount = await this.receiptRepository.count();
    const nextReceiptId = `RCP${String(totalCount + 1).padStart(4, '0')}`;

    const receipt = this.receiptRepository.create({
      ...createReceiptDto,
      receiptId: nextReceiptId,
    });

    return await this.receiptRepository.save(receipt);
  }

  async findAll(): Promise<Receipt[]> {
    return await this.receiptRepository.find({
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: number): Promise<Receipt> {
    const receipt = await this.receiptRepository.findOne({
      where: { id }
    });

    if (!receipt) {
      throw new NotFoundException('해당 입고를 찾을 수 없습니다.');
    }

    return receipt;
  }

  async update(id: number, updateReceiptDto: UpdateReceiptDto): Promise<Receipt> {
    const receipt = await this.findOne(id);

    Object.assign(receipt, updateReceiptDto);
    return await this.receiptRepository.save(receipt);
  }

  async remove(id: number): Promise<void> {
    const receipt = await this.findOne(id);
    await this.receiptRepository.remove(receipt);
  }

  // 상태별 입고 조회
  async findByStatus(status: string): Promise<Receipt[]> {
    return await this.receiptRepository.find({
      where: { status },
      order: { createdAt: 'DESC' }
    });
  }


  // 공급업체별 입고 조회
  async findBySupplier(supplierId: string): Promise<Receipt[]> {
    return await this.receiptRepository.find({
      where: { supplierId },
      order: { createdAt: 'DESC' }
    });
  }

  // 담당자별 입고 조회
  async findByManager(manager: string): Promise<Receipt[]> {
    return await this.receiptRepository.find({
      where: { manager },
      order: { createdAt: 'DESC' }
    });
  }

  // 발주 ID별 입고 조회
  async findByOrdering(orderingId: string): Promise<Receipt[]> {
    return await this.receiptRepository.find({
      where: { orderingId },
      order: { createdAt: 'DESC' }
    });
  }

  // 날짜 범위별 입고 조회
  async findByDateRange(startDate: string, endDate: string): Promise<Receipt[]> {
    return await this.receiptRepository
      .createQueryBuilder('receipt')
      .where('receipt.receivedDate BETWEEN :startDate AND :endDate', { startDate, endDate })
      .orderBy('receipt.receivedDate', 'ASC')
      .getMany();
  }

  // 부분 입고 현황 조회
  async findPartialReceipts(): Promise<Receipt[]> {
    return await this.receiptRepository
      .createQueryBuilder('receipt')
      .where('receipt.status = :status', { status: 'partial' })
      .orWhere('receipt.receivedQuantity < receipt.orderedQuantity')
      .orderBy('receipt.createdAt', 'DESC')
      .getMany();
  }
}
