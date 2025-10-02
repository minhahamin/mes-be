import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from '../../purchases/entities/purchase.entity';
import { Receipt } from '../../receipts/entities/receipt.entity';

@Injectable()
export class PurchaseReceiptStatusService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
    @InjectRepository(Receipt)
    private receiptRepository: Repository<Receipt>,
  ) {}

  // 전체 발주/입고 현황 조회
  async findAllStatus() {
    const purchases = await this.purchaseRepository.find({
      order: { createdAt: 'DESC' }
    });

    const statusList = await Promise.all(
      purchases.map(async (purchase) => {
        const receipts = await this.receiptRepository.find({
          where: { orderingId: purchase.orderId }
        });

        const totalReceivedQuantity = receipts.reduce((sum, receipt) => sum + receipt.receivedQuantity, 0);
        const completedReceipts = receipts.filter(receipt => receipt.status === 'completed');
        const completedQuantity = completedReceipts.reduce((sum, receipt) => sum + receipt.receivedQuantity, 0);
        const pendingReceipts = receipts.filter(receipt => receipt.status === 'pending');

        const receiptRate = purchase.orderQuantity > 0 
          ? ((totalReceivedQuantity / purchase.orderQuantity) * 100).toFixed(2)
          : 0;

        return {
          purchase: {
            orderId: purchase.orderId,
            supplierId: purchase.supplierId,
            supplierName: purchase.supplierName,
            productCode: purchase.productCode,
            productName: purchase.productName,
            orderQuantity: purchase.orderQuantity,
            unitPrice: purchase.unitPrice,
            totalAmount: purchase.totalAmount,
            orderDate: purchase.orderDate,
            expectedDeliveryDate: purchase.expectedDeliveryDate,
            status: purchase.status,
            priority: purchase.priority,
            purchaser: purchase.purchaser,
          },
          receiptSummary: {
            totalReceivedQuantity,
            completedQuantity,
            remainingQuantity: purchase.orderQuantity - totalReceivedQuantity,
            receiptRate: parseFloat(receiptRate as string),
            receiptCount: receipts.length,
            completedReceiptCount: completedReceipts.length,
            pendingReceiptCount: pendingReceipts.length,
          },
          receipts: receipts.map(receipt => ({
            receiptId: receipt.receiptId,
            receivedQuantity: receipt.receivedQuantity,
            deliveryDate: receipt.deliveryDate,
            receivedDate: receipt.receivedDate,
            warehouseLocation: receipt.warehouseLocation,
            status: receipt.status,
            manager: receipt.manager,
          })),
        };
      })
    );

    return statusList;
  }

  // 특정 발주의 입고 현황 조회
  async findStatusByPurchaseId(orderId: string) {
    const purchase = await this.purchaseRepository.findOne({
      where: { orderId }
    });

    if (!purchase) {
      throw new Error('해당 발주를 찾을 수 없습니다.');
    }

    const receipts = await this.receiptRepository.find({
      where: { orderingId: orderId }
    });

    const totalReceivedQuantity = receipts.reduce((sum, receipt) => sum + receipt.receivedQuantity, 0);
    const completedReceipts = receipts.filter(receipt => receipt.status === 'completed');
    const completedQuantity = completedReceipts.reduce((sum, receipt) => sum + receipt.receivedQuantity, 0);

    const receiptRate = purchase.orderQuantity > 0 
      ? ((totalReceivedQuantity / purchase.orderQuantity) * 100).toFixed(2)
      : 0;

    return {
      purchase: {
        orderId: purchase.orderId,
        supplierId: purchase.supplierId,
        supplierName: purchase.supplierName,
        productCode: purchase.productCode,
        productName: purchase.productName,
        orderQuantity: purchase.orderQuantity,
        unitPrice: purchase.unitPrice,
        totalAmount: purchase.totalAmount,
        orderDate: purchase.orderDate,
        expectedDeliveryDate: purchase.expectedDeliveryDate,
        status: purchase.status,
        priority: purchase.priority,
        purchaser: purchase.purchaser,
        deliveryAddress: purchase.deliveryAddress,
      },
      receiptSummary: {
        totalReceivedQuantity,
        completedQuantity,
        remainingQuantity: purchase.orderQuantity - totalReceivedQuantity,
        receiptRate: parseFloat(receiptRate as string),
        receiptCount: receipts.length,
        completedReceiptCount: completedReceipts.length,
      },
      receipts: receipts.map(receipt => ({
        receiptId: receipt.receiptId,
        receivedQuantity: receipt.receivedQuantity,
        orderedQuantity: receipt.orderedQuantity,
        deliveryDate: receipt.deliveryDate,
        receivedDate: receipt.receivedDate,
        warehouseLocation: receipt.warehouseLocation,
        status: receipt.status,
        manager: receipt.manager,
        notes: receipt.notes,
      })),
    };
  }

  // 공급업체별 발주/입고 현황 조회
  async findStatusBySupplier(supplierId: string) {
    const purchases = await this.purchaseRepository.find({
      where: { supplierId },
      order: { createdAt: 'DESC' }
    });

    const statusList = await Promise.all(
      purchases.map(async (purchase) => {
        const receipts = await this.receiptRepository.find({
          where: { orderingId: purchase.orderId }
        });

        const totalReceivedQuantity = receipts.reduce((sum, receipt) => sum + receipt.receivedQuantity, 0);
        const receiptRate = purchase.orderQuantity > 0 
          ? ((totalReceivedQuantity / purchase.orderQuantity) * 100).toFixed(2)
          : 0;

        return {
          orderId: purchase.orderId,
          productCode: purchase.productCode,
          productName: purchase.productName,
          orderQuantity: purchase.orderQuantity,
          totalReceivedQuantity,
          remainingQuantity: purchase.orderQuantity - totalReceivedQuantity,
          receiptRate: parseFloat(receiptRate as string),
          status: purchase.status,
          orderDate: purchase.orderDate,
        };
      })
    );

    const totalOrderQuantity = statusList.reduce((sum, item) => sum + item.orderQuantity, 0);
    const totalReceivedQuantity = statusList.reduce((sum, item) => sum + item.totalReceivedQuantity, 0);
    const overallReceiptRate = totalOrderQuantity > 0
      ? ((totalReceivedQuantity / totalOrderQuantity) * 100).toFixed(2)
      : 0;

    return {
      supplierId,
      supplierName: purchases[0]?.supplierName || '',
      totalOrderQuantity,
      totalReceivedQuantity,
      overallReceiptRate: parseFloat(overallReceiptRate as string),
      purchaseCount: statusList.length,
      purchases: statusList,
    };
  }

  // 제품별 발주/입고 현황 조회
  async findStatusByProduct(productCode: string) {
    const purchases = await this.purchaseRepository.find({
      where: { productCode },
      order: { createdAt: 'DESC' }
    });

    const statusList = await Promise.all(
      purchases.map(async (purchase) => {
        const receipts = await this.receiptRepository.find({
          where: { orderingId: purchase.orderId }
        });

        const totalReceivedQuantity = receipts.reduce((sum, receipt) => sum + receipt.receivedQuantity, 0);
        const receiptRate = purchase.orderQuantity > 0 
          ? ((totalReceivedQuantity / purchase.orderQuantity) * 100).toFixed(2)
          : 0;

        return {
          orderId: purchase.orderId,
          supplierId: purchase.supplierId,
          supplierName: purchase.supplierName,
          orderQuantity: purchase.orderQuantity,
          totalReceivedQuantity,
          receiptRate: parseFloat(receiptRate as string),
          status: purchase.status,
          orderDate: purchase.orderDate,
        };
      })
    );

    const totalOrderQuantity = statusList.reduce((sum, item) => sum + item.orderQuantity, 0);
    const totalReceivedQuantity = statusList.reduce((sum, item) => sum + item.totalReceivedQuantity, 0);
    const overallReceiptRate = totalOrderQuantity > 0
      ? ((totalReceivedQuantity / totalOrderQuantity) * 100).toFixed(2)
      : 0;

    return {
      productCode,
      productName: purchases[0]?.productName || '',
      totalOrderQuantity,
      totalReceivedQuantity,
      overallReceiptRate: parseFloat(overallReceiptRate as string),
      purchaseCount: statusList.length,
      purchases: statusList,
    };
  }

  // 기간별 발주/입고 현황 조회
  async findStatusByDateRange(startDate: string, endDate: string) {
    const purchases = await this.purchaseRepository
      .createQueryBuilder('purchase')
      .where('purchase.orderDate BETWEEN :startDate AND :endDate', { startDate, endDate })
      .orderBy('purchase.orderDate', 'ASC')
      .getMany();

    const statusList = await Promise.all(
      purchases.map(async (purchase) => {
        const receipts = await this.receiptRepository.find({
          where: { orderingId: purchase.orderId }
        });

        const totalReceivedQuantity = receipts.reduce((sum, receipt) => sum + receipt.receivedQuantity, 0);
        const receiptRate = purchase.orderQuantity > 0 
          ? ((totalReceivedQuantity / purchase.orderQuantity) * 100).toFixed(2)
          : 0;

        return {
          orderId: purchase.orderId,
          supplierId: purchase.supplierId,
          supplierName: purchase.supplierName,
          productCode: purchase.productCode,
          productName: purchase.productName,
          orderQuantity: purchase.orderQuantity,
          totalReceivedQuantity,
          receiptRate: parseFloat(receiptRate as string),
          status: purchase.status,
          orderDate: purchase.orderDate,
        };
      })
    );

    const totalOrderQuantity = statusList.reduce((sum, item) => sum + item.orderQuantity, 0);
    const totalReceivedQuantity = statusList.reduce((sum, item) => sum + item.totalReceivedQuantity, 0);
    const overallReceiptRate = totalOrderQuantity > 0
      ? ((totalReceivedQuantity / totalOrderQuantity) * 100).toFixed(2)
      : 0;

    return {
      startDate,
      endDate,
      totalOrderQuantity,
      totalReceivedQuantity,
      overallReceiptRate: parseFloat(overallReceiptRate as string),
      purchaseCount: statusList.length,
      purchases: statusList,
    };
  }

  // 미입고 발주 현황 조회 (입고율이 100% 미만인 발주)
  async findPendingReceipts() {
    const purchases = await this.purchaseRepository.find({
      order: { orderDate: 'ASC' }
    });

    const pendingList = await Promise.all(
      purchases.map(async (purchase) => {
        const receipts = await this.receiptRepository.find({
          where: { orderingId: purchase.orderId }
        });

        const totalReceivedQuantity = receipts.reduce((sum, receipt) => sum + receipt.receivedQuantity, 0);
        const receiptRate = purchase.orderQuantity > 0 
          ? ((totalReceivedQuantity / purchase.orderQuantity) * 100).toFixed(2)
          : 0;

        if (parseFloat(receiptRate as string) < 100) {
          return {
            orderId: purchase.orderId,
            supplierId: purchase.supplierId,
            supplierName: purchase.supplierName,
            productCode: purchase.productCode,
            productName: purchase.productName,
            orderQuantity: purchase.orderQuantity,
            totalReceivedQuantity,
            remainingQuantity: purchase.orderQuantity - totalReceivedQuantity,
            receiptRate: parseFloat(receiptRate as string),
            status: purchase.status,
            orderDate: purchase.orderDate,
            expectedDeliveryDate: purchase.expectedDeliveryDate,
            priority: purchase.priority,
          };
        }
        return null;
      })
    );

    return pendingList.filter(item => item !== null);
  }

  // 입고 완료된 발주 현황 조회 (입고율 100%)
  async findCompletedReceipts() {
    const purchases = await this.purchaseRepository.find({
      order: { orderDate: 'DESC' }
    });

    const completedList = await Promise.all(
      purchases.map(async (purchase) => {
        const receipts = await this.receiptRepository.find({
          where: { orderingId: purchase.orderId }
        });

        const totalReceivedQuantity = receipts.reduce((sum, receipt) => sum + receipt.receivedQuantity, 0);
        const receiptRate = purchase.orderQuantity > 0 
          ? ((totalReceivedQuantity / purchase.orderQuantity) * 100).toFixed(2)
          : 0;

        if (parseFloat(receiptRate as string) >= 100) {
          return {
            orderId: purchase.orderId,
            supplierId: purchase.supplierId,
            supplierName: purchase.supplierName,
            productCode: purchase.productCode,
            productName: purchase.productName,
            orderQuantity: purchase.orderQuantity,
            totalReceivedQuantity,
            receiptRate: parseFloat(receiptRate as string),
            orderDate: purchase.orderDate,
          };
        }
        return null;
      })
    );

    return completedList.filter(item => item !== null);
  }

  // 지연 입고 현황 조회 (예정일 지난 미완료 발주)
  async findDelayedReceipts() {
    const today = new Date().toISOString().split('T')[0];
    const purchases = await this.purchaseRepository
      .createQueryBuilder('purchase')
      .where('purchase.expectedDeliveryDate < :today', { today })
      .andWhere('purchase.status != :status', { status: 'completed' })
      .orderBy('purchase.expectedDeliveryDate', 'ASC')
      .getMany();

    const delayedList = await Promise.all(
      purchases.map(async (purchase) => {
        const receipts = await this.receiptRepository.find({
          where: { orderingId: purchase.orderId }
        });

        const totalReceivedQuantity = receipts.reduce((sum, receipt) => sum + receipt.receivedQuantity, 0);
        const receiptRate = purchase.orderQuantity > 0 
          ? ((totalReceivedQuantity / purchase.orderQuantity) * 100).toFixed(2)
          : 0;

        // 입고율이 100% 미만인 경우만
        if (parseFloat(receiptRate as string) < 100) {
          const delayDays = Math.floor(
            (new Date().getTime() - new Date(purchase.expectedDeliveryDate).getTime()) / (1000 * 60 * 60 * 24)
          );

          return {
            orderId: purchase.orderId,
            supplierId: purchase.supplierId,
            supplierName: purchase.supplierName,
            productCode: purchase.productCode,
            productName: purchase.productName,
            orderQuantity: purchase.orderQuantity,
            totalReceivedQuantity,
            remainingQuantity: purchase.orderQuantity - totalReceivedQuantity,
            receiptRate: parseFloat(receiptRate as string),
            orderDate: purchase.orderDate,
            expectedDeliveryDate: purchase.expectedDeliveryDate,
            delayDays,
            priority: purchase.priority,
          };
        }
        return null;
      })
    );

    return delayedList.filter(item => item !== null);
  }
}
