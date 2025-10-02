import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from '../entities/inventory.entity';
import { CreateInventoryDto } from '../dto/create-inventory.dto';
import { UpdateInventoryDto } from '../dto/update-inventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async create(createInventoryDto: CreateInventoryDto): Promise<Inventory> {
    // 제품 코드 중복 확인
    const existingInventory = await this.inventoryRepository.findOne({
      where: { productCode: createInventoryDto.productCode }
    });

    if (existingInventory) {
      throw new ConflictException('이미 등록된 제품입니다.');
    }

    // 총 재고 가치 계산
    const currentStock = createInventoryDto.currentStock || 0;
    const unitCost = createInventoryDto.unitCost || 0;
    const totalValue = currentStock * unitCost;

    // 재고 상태 자동 결정
    let status = createInventoryDto.status || 'sufficient';
    const minStock = createInventoryDto.minStock || 0;
    const maxStock = createInventoryDto.maxStock || 0;

    if (currentStock === 0) {
      status = 'out_of_stock';
    } else if (currentStock <= minStock) {
      status = 'low';
    } else if (maxStock > 0 && currentStock > maxStock) {
      status = 'excess';
    }

    const inventory = this.inventoryRepository.create({
      ...createInventoryDto,
      totalValue,
      status,
      lastUpdated: new Date(),
    });

    return await this.inventoryRepository.save(inventory);
  }

  async findAll(): Promise<Inventory[]> {
    return await this.inventoryRepository.find({
      order: { updatedAt: 'DESC' }
    });
  }

  async findOne(id: number): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findOne({
      where: { id }
    });

    if (!inventory) {
      throw new NotFoundException('해당 재고를 찾을 수 없습니다.');
    }

    return inventory;
  }

  async findByProductCode(productCode: string): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findOne({
      where: { productCode }
    });

    if (!inventory) {
      throw new NotFoundException('해당 제품의 재고를 찾을 수 없습니다.');
    }

    return inventory;
  }

  async update(id: number, updateInventoryDto: UpdateInventoryDto): Promise<Inventory> {
    const inventory = await this.findOne(id);

    // 총 재고 가치 재계산
    const currentStock = updateInventoryDto.currentStock !== undefined 
      ? updateInventoryDto.currentStock 
      : inventory.currentStock;
    const unitCost = updateInventoryDto.unitCost !== undefined 
      ? updateInventoryDto.unitCost 
      : inventory.unitCost;
    const totalValue = currentStock * parseFloat(unitCost.toString());

    // 재고 상태 자동 결정
    const minStock = updateInventoryDto.minStock !== undefined 
      ? updateInventoryDto.minStock 
      : inventory.minStock;
    const maxStock = updateInventoryDto.maxStock !== undefined 
      ? updateInventoryDto.maxStock 
      : inventory.maxStock;

    let status = updateInventoryDto.status || inventory.status;
    if (currentStock === 0) {
      status = 'out_of_stock';
    } else if (currentStock <= minStock) {
      status = 'low';
    } else if (maxStock > 0 && currentStock > maxStock) {
      status = 'excess';
    } else {
      status = 'sufficient';
    }

    Object.assign(inventory, {
      ...updateInventoryDto,
      totalValue,
      status,
      lastUpdated: new Date(),
    });

    return await this.inventoryRepository.save(inventory);
  }

  async remove(id: number): Promise<void> {
    const inventory = await this.findOne(id);
    await this.inventoryRepository.remove(inventory);
  }

  // 재고 조정 (입고/출고/조정)
  async adjustStock(productCode: string, quantity: number, movementType: string, notes?: string): Promise<Inventory> {
    const inventory = await this.findByProductCode(productCode);

    let newStock = inventory.currentStock;
    
    if (movementType === 'in' || movementType === 'return') {
      newStock += quantity;
    } else if (movementType === 'out' || movementType === 'transfer') {
      newStock -= quantity;
      if (newStock < 0) {
        throw new ConflictException('재고가 부족합니다.');
      }
    } else if (movementType === 'adjustment') {
      newStock = quantity; // 조정은 절대값으로 설정
    }

    const totalValue = newStock * parseFloat(inventory.unitCost.toString());

    // 재고 상태 자동 결정
    let status = 'sufficient';
    if (newStock === 0) {
      status = 'out_of_stock';
    } else if (newStock <= inventory.minStock) {
      status = 'low';
    } else if (inventory.maxStock > 0 && newStock > inventory.maxStock) {
      status = 'excess';
    }

    inventory.currentStock = newStock;
    inventory.totalValue = totalValue;
    inventory.status = status;
    inventory.lastMovementDate = new Date();
    inventory.movementType = movementType;
    inventory.movementQuantity = quantity;
    inventory.lastUpdated = new Date();
    if (notes) {
      inventory.notes = notes;
    }

    return await this.inventoryRepository.save(inventory);
  }

  // 상태별 재고 조회
  async findByStatus(status: string): Promise<Inventory[]> {
    return await this.inventoryRepository.find({
      where: { status },
      order: { currentStock: 'ASC' }
    });
  }

  // 카테고리별 재고 조회
  async findByCategory(category: string): Promise<Inventory[]> {
    return await this.inventoryRepository.find({
      where: { category },
      order: { productName: 'ASC' }
    });
  }

  // 공급업체별 재고 조회
  async findBySupplier(supplier: string): Promise<Inventory[]> {
    return await this.inventoryRepository.find({
      where: { supplier },
      order: { productName: 'ASC' }
    });
  }

  // 위치별 재고 조회
  async findByLocation(location: string): Promise<Inventory[]> {
    return await this.inventoryRepository.find({
      where: { location },
      order: { productName: 'ASC' }
    });
  }

  // 부족 재고 조회 (재주문 필요)
  async findLowStock(): Promise<Inventory[]> {
    return await this.inventoryRepository
      .createQueryBuilder('inventory')
      .where('inventory.currentStock <= inventory.reorderPoint')
      .orderBy('inventory.currentStock', 'ASC')
      .getMany();
  }

  // 재고 부족 항목 조회
  async findOutOfStock(): Promise<Inventory[]> {
    return await this.inventoryRepository.find({
      where: { status: 'out_of_stock' },
      order: { lastUpdated: 'DESC' }
    });
  }

  // 과잉 재고 조회
  async findExcessStock(): Promise<Inventory[]> {
    return await this.inventoryRepository.find({
      where: { status: 'excess' },
      order: { currentStock: 'DESC' }
    });
  }

  // 총 재고 가치 조회
  async getTotalInventoryValue(): Promise<{ totalValue: number, totalItems: number }> {
    const inventories = await this.inventoryRepository.find();
    const totalValue = inventories.reduce((sum, inv) => sum + parseFloat(inv.totalValue.toString()), 0);
    const totalItems = inventories.length;

    return { totalValue, totalItems };
  }

  // 카테고리별 재고 통계
  async getInventoryStatsByCategory(category: string) {
    const inventories = await this.findByCategory(category);

    const totalItems = inventories.length;
    const totalStock = inventories.reduce((sum, inv) => sum + inv.currentStock, 0);
    const totalValue = inventories.reduce((sum, inv) => sum + parseFloat(inv.totalValue.toString()), 0);
    const lowStockItems = inventories.filter(inv => inv.status === 'low').length;
    const outOfStockItems = inventories.filter(inv => inv.status === 'out_of_stock').length;
    const excessItems = inventories.filter(inv => inv.status === 'excess').length;

    return {
      category,
      totalItems,
      totalStock,
      totalValue,
      lowStockItems,
      outOfStockItems,
      excessItems,
    };
  }

  // 재고 회전율 계산 (간단 버전)
  async getInventoryTurnover(productCode: string, soldQuantity: number): Promise<{ turnoverRate: number }> {
    const inventory = await this.findByProductCode(productCode);
    const averageInventory = (inventory.currentStock + inventory.maxStock) / 2;
    const turnoverRate = averageInventory > 0 ? (soldQuantity / averageInventory) : 0;

    return { turnoverRate: parseFloat(turnoverRate.toFixed(2)) };
  }
}
