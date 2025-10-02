import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from '../../inventory/entities/inventory.entity';

@Injectable()
export class InventoryStatusService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  // 전체 재고 현황 조회
  async findAllStatus() {
    const inventories = await this.inventoryRepository.find({
      order: { category: 'ASC', productName: 'ASC' }
    });

    const totalValue = inventories.reduce((sum, inv) => sum + parseFloat(inv.totalValue.toString()), 0);
    const totalStock = inventories.reduce((sum, inv) => sum + inv.currentStock, 0);

    const statusSummary = {
      sufficient: inventories.filter(inv => inv.status === 'sufficient').length,
      low: inventories.filter(inv => inv.status === 'low').length,
      out_of_stock: inventories.filter(inv => inv.status === 'out_of_stock').length,
      excess: inventories.filter(inv => inv.status === 'excess').length,
    };

    return {
      summary: {
        totalItems: inventories.length,
        totalStock,
        totalValue: parseFloat(totalValue.toFixed(2)),
        statusSummary,
      },
      inventories: inventories.map(inv => ({
        productCode: inv.productCode,
        productName: inv.productName,
        category: inv.category,
        currentStock: inv.currentStock,
        minStock: inv.minStock,
        maxStock: inv.maxStock,
        status: inv.status,
        location: inv.location,
        totalValue: inv.totalValue,
        supplier: inv.supplier,
      })),
    };
  }

  // 카테고리별 재고 현황 조회
  async findStatusByCategory(category: string) {
    const inventories = await this.inventoryRepository.find({
      where: { category },
      order: { productName: 'ASC' }
    });

    const totalValue = inventories.reduce((sum, inv) => sum + parseFloat(inv.totalValue.toString()), 0);
    const totalStock = inventories.reduce((sum, inv) => sum + inv.currentStock, 0);

    const statusSummary = {
      sufficient: inventories.filter(inv => inv.status === 'sufficient').length,
      low: inventories.filter(inv => inv.status === 'low').length,
      out_of_stock: inventories.filter(inv => inv.status === 'out_of_stock').length,
      excess: inventories.filter(inv => inv.status === 'excess').length,
    };

    return {
      category,
      totalItems: inventories.length,
      totalStock,
      totalValue: parseFloat(totalValue.toFixed(2)),
      statusSummary,
      inventories: inventories.map(inv => ({
        productCode: inv.productCode,
        productName: inv.productName,
        currentStock: inv.currentStock,
        minStock: inv.minStock,
        maxStock: inv.maxStock,
        reorderPoint: inv.reorderPoint,
        status: inv.status,
        location: inv.location,
        totalValue: inv.totalValue,
      })),
    };
  }

  // 공급업체별 재고 현황 조회
  async findStatusBySupplier(supplier: string) {
    const inventories = await this.inventoryRepository.find({
      where: { supplier },
      order: { productName: 'ASC' }
    });

    const totalValue = inventories.reduce((sum, inv) => sum + parseFloat(inv.totalValue.toString()), 0);
    const totalStock = inventories.reduce((sum, inv) => sum + inv.currentStock, 0);

    const statusSummary = {
      sufficient: inventories.filter(inv => inv.status === 'sufficient').length,
      low: inventories.filter(inv => inv.status === 'low').length,
      out_of_stock: inventories.filter(inv => inv.status === 'out_of_stock').length,
      excess: inventories.filter(inv => inv.status === 'excess').length,
    };

    return {
      supplier,
      totalItems: inventories.length,
      totalStock,
      totalValue: parseFloat(totalValue.toFixed(2)),
      statusSummary,
      inventories: inventories.map(inv => ({
        productCode: inv.productCode,
        productName: inv.productName,
        category: inv.category,
        currentStock: inv.currentStock,
        status: inv.status,
        location: inv.location,
        totalValue: inv.totalValue,
      })),
    };
  }

  // 위치별 재고 현황 조회
  async findStatusByLocation(location: string) {
    const inventories = await this.inventoryRepository.find({
      where: { location },
      order: { productName: 'ASC' }
    });

    const totalValue = inventories.reduce((sum, inv) => sum + parseFloat(inv.totalValue.toString()), 0);
    const totalStock = inventories.reduce((sum, inv) => sum + inv.currentStock, 0);

    return {
      location,
      totalItems: inventories.length,
      totalStock,
      totalValue: parseFloat(totalValue.toFixed(2)),
      inventories: inventories.map(inv => ({
        productCode: inv.productCode,
        productName: inv.productName,
        category: inv.category,
        currentStock: inv.currentStock,
        status: inv.status,
        totalValue: inv.totalValue,
      })),
    };
  }

  // 재고 부족 현황 조회 (재주문 필요)
  async findLowStockStatus() {
    const inventories = await this.inventoryRepository
      .createQueryBuilder('inventory')
      .where('inventory.currentStock <= inventory.reorderPoint')
      .orderBy('inventory.currentStock', 'ASC')
      .getMany();

    const totalReorderValue = inventories.reduce((sum, inv) => {
      const reorderQuantity = inv.maxStock - inv.currentStock;
      return sum + (reorderQuantity * parseFloat(inv.unitCost.toString()));
    }, 0);

    return {
      totalLowStockItems: inventories.length,
      estimatedReorderValue: parseFloat(totalReorderValue.toFixed(2)),
      items: inventories.map(inv => ({
        productCode: inv.productCode,
        productName: inv.productName,
        category: inv.category,
        currentStock: inv.currentStock,
        minStock: inv.minStock,
        reorderPoint: inv.reorderPoint,
        maxStock: inv.maxStock,
        reorderQuantity: inv.maxStock - inv.currentStock,
        estimatedCost: (inv.maxStock - inv.currentStock) * parseFloat(inv.unitCost.toString()),
        supplier: inv.supplier,
        location: inv.location,
      })),
    };
  }

  // 재고 가치 현황 조회 (상위 N개)
  async findTopValueItems(limit: number = 10) {
    const inventories = await this.inventoryRepository
      .createQueryBuilder('inventory')
      .orderBy('inventory.totalValue', 'DESC')
      .limit(limit)
      .getMany();

    const totalValue = inventories.reduce((sum, inv) => sum + parseFloat(inv.totalValue.toString()), 0);

    return {
      topItems: inventories.map(inv => ({
        productCode: inv.productCode,
        productName: inv.productName,
        category: inv.category,
        currentStock: inv.currentStock,
        unitCost: inv.unitCost,
        totalValue: inv.totalValue,
        location: inv.location,
      })),
      totalValue: parseFloat(totalValue.toFixed(2)),
    };
  }

  // 재고 상태 요약
  async getInventoryStatusSummary() {
    const inventories = await this.inventoryRepository.find();

    const totalValue = inventories.reduce((sum, inv) => sum + parseFloat(inv.totalValue.toString()), 0);
    const totalStock = inventories.reduce((sum, inv) => sum + inv.currentStock, 0);

    const sufficientItems = inventories.filter(inv => inv.status === 'sufficient');
    const lowStockItems = inventories.filter(inv => inv.status === 'low');
    const outOfStockItems = inventories.filter(inv => inv.status === 'out_of_stock');
    const excessItems = inventories.filter(inv => inv.status === 'excess');
    const reorderItems = inventories.filter(inv => inv.currentStock <= inv.reorderPoint);

    // 카테고리별 집계
    const categoryStats = {};
    inventories.forEach(inv => {
      if (!categoryStats[inv.category]) {
        categoryStats[inv.category] = {
          count: 0,
          totalStock: 0,
          totalValue: 0,
        };
      }
      categoryStats[inv.category].count++;
      categoryStats[inv.category].totalStock += inv.currentStock;
      categoryStats[inv.category].totalValue += parseFloat(inv.totalValue.toString());
    });

    return {
      overview: {
        totalItems: inventories.length,
        totalStock,
        totalValue: parseFloat(totalValue.toFixed(2)),
      },
      statusBreakdown: {
        sufficient: {
          count: sufficientItems.length,
          totalValue: sufficientItems.reduce((sum, inv) => sum + parseFloat(inv.totalValue.toString()), 0),
        },
        low: {
          count: lowStockItems.length,
          totalValue: lowStockItems.reduce((sum, inv) => sum + parseFloat(inv.totalValue.toString()), 0),
        },
        out_of_stock: {
          count: outOfStockItems.length,
        },
        excess: {
          count: excessItems.length,
          totalValue: excessItems.reduce((sum, inv) => sum + parseFloat(inv.totalValue.toString()), 0),
        },
      },
      reorderRequired: {
        count: reorderItems.length,
        items: reorderItems.map(inv => ({
          productCode: inv.productCode,
          productName: inv.productName,
          currentStock: inv.currentStock,
          reorderPoint: inv.reorderPoint,
          supplier: inv.supplier,
        })),
      },
      categoryStats,
    };
  }

  // 최근 이동 내역 조회
  async findRecentMovements(limit: number = 20) {
    const inventories = await this.inventoryRepository
      .createQueryBuilder('inventory')
      .where('inventory.lastMovementDate IS NOT NULL')
      .orderBy('inventory.lastMovementDate', 'DESC')
      .limit(limit)
      .getMany();

    return inventories.map(inv => ({
      productCode: inv.productCode,
      productName: inv.productName,
      currentStock: inv.currentStock,
      movementType: inv.movementType,
      movementQuantity: inv.movementQuantity,
      lastMovementDate: inv.lastMovementDate,
      location: inv.location,
      notes: inv.notes,
    }));
  }

  // 제품별 재고 상세 현황
  async findDetailedStatusByProduct(productCode: string) {
    const inventory = await this.inventoryRepository.findOne({
      where: { productCode }
    });

    if (!inventory) {
      throw new Error('해당 제품의 재고를 찾을 수 없습니다.');
    }

    const stockHealthPercentage = inventory.maxStock > 0
      ? ((inventory.currentStock / inventory.maxStock) * 100).toFixed(2)
      : 0;

    const daysUntilReorder = inventory.reorderPoint > 0 && inventory.currentStock > inventory.reorderPoint
      ? Math.floor((inventory.currentStock - inventory.reorderPoint) / (inventory.reorderPoint * 0.1)) // 간단한 예측
      : 0;

    return {
      product: {
        productCode: inventory.productCode,
        productName: inventory.productName,
        category: inventory.category,
      },
      currentStatus: {
        currentStock: inventory.currentStock,
        status: inventory.status,
        stockHealthPercentage: parseFloat(stockHealthPercentage as string),
      },
      thresholds: {
        minStock: inventory.minStock,
        maxStock: inventory.maxStock,
        reorderPoint: inventory.reorderPoint,
      },
      value: {
        unitCost: inventory.unitCost,
        totalValue: inventory.totalValue,
      },
      location: {
        location: inventory.location,
        supplier: inventory.supplier,
      },
      lastMovement: {
        date: inventory.lastMovementDate,
        type: inventory.movementType,
        quantity: inventory.movementQuantity,
      },
      reorderInfo: {
        needsReorder: inventory.currentStock <= inventory.reorderPoint,
        recommendedOrderQuantity: inventory.currentStock <= inventory.reorderPoint 
          ? inventory.maxStock - inventory.currentStock 
          : 0,
        estimatedDaysUntilReorder: daysUntilReorder,
      },
      notes: inventory.notes,
    };
  }
}
