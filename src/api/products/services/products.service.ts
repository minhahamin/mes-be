import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { Inventory } from '../../inventory/entities/inventory.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    // 자동증가 품목 코드 생성
    const totalCount = await this.productRepository.count();
    const nextProductCode = `PROD${String(totalCount + 1).padStart(3, '0')}`;

    const product = this.productRepository.create({
      ...createProductDto,
      productCode: nextProductCode
    });
    return await this.productRepository.save(product);
  }

  async findAll(): Promise<any[]> {
    const products = await this.productRepository.find({
      order: { createdAt: 'DESC' }
    });

    // 각 제품에 대해 inventory 정보를 조인
    const productsWithInventory = await Promise.all(
      products.map(async (product) => {
        const inventory = await this.inventoryRepository.findOne({
          where: { productCode: product.productCode }
        });

        return {
          ...product,
          inventoryDetail: inventory ? {
            currentStock: inventory.currentStock,
            minStock: inventory.minStock,
            maxStock: inventory.maxStock,
            reorderPoint: inventory.reorderPoint,
            status: inventory.status,
            location: inventory.location,
            unitCost: inventory.unitCost,
            totalValue: inventory.totalValue,
            lastMovementDate: inventory.lastMovementDate,
            movementType: inventory.movementType,
            movementQuantity: inventory.movementQuantity,
          } : null
        };
      })
    );

    return productsWithInventory;
  }

  async findOne(id: number): Promise<any> {
    const product = await this.productRepository.findOne({
      where: { id }
    });

    if (!product) {
      throw new NotFoundException('해당 품목을 찾을 수 없습니다.');
    }

    // inventory 정보 조인
    const inventory = await this.inventoryRepository.findOne({
      where: { productCode: product.productCode }
    });

    return {
      ...product,
      inventoryDetail: inventory ? {
        currentStock: inventory.currentStock,
        minStock: inventory.minStock,
        maxStock: inventory.maxStock,
        reorderPoint: inventory.reorderPoint,
        status: inventory.status,
        location: inventory.location,
        unitCost: inventory.unitCost,
        totalValue: inventory.totalValue,
        lastMovementDate: inventory.lastMovementDate,
        movementType: inventory.movementType,
        movementQuantity: inventory.movementQuantity,
      } : null
    };
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);

    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  // 재고 부족 품목 조회
  async findLowStockProducts(): Promise<Product[]> {
    return await this.productRepository
      .createQueryBuilder('product')
      .where('product.stock <= product.minStock')
      .andWhere('product.status = :status', { status: 'active' })
      .orderBy('product.stock', 'ASC')
      .getMany();
  }

  // 카테고리별 품목 조회
  async findByCategory(category: string): Promise<any[]> {
    const products = await this.productRepository.find({
      where: { category, status: 'active' },
      order: { productName: 'ASC' }
    });

    // 각 제품에 대해 inventory 정보를 조인
    const productsWithInventory = await Promise.all(
      products.map(async (product) => {
        const inventory = await this.inventoryRepository.findOne({
          where: { productCode: product.productCode }
        });

        return {
          ...product,
          inventoryDetail: inventory ? {
            currentStock: inventory.currentStock,
            status: inventory.status,
            location: inventory.location,
            totalValue: inventory.totalValue,
          } : null
        };
      })
    );

    return productsWithInventory;
  }

  // 공급업체별 품목 조회
  async findBySupplier(supplier: string): Promise<any[]> {
    const products = await this.productRepository.find({
      where: { supplier, status: 'active' },
      order: { productName: 'ASC' }
    });

    // 각 제품에 대해 inventory 정보를 조인
    const productsWithInventory = await Promise.all(
      products.map(async (product) => {
        const inventory = await this.inventoryRepository.findOne({
          where: { productCode: product.productCode }
        });

        return {
          ...product,
          inventoryDetail: inventory ? {
            currentStock: inventory.currentStock,
            status: inventory.status,
            location: inventory.location,
            totalValue: inventory.totalValue,
          } : null
        };
      })
    );

    return productsWithInventory;
  }
}
