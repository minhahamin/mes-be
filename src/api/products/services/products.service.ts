import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
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

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      order: { createdAt: 'DESC' }
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id }
    });

    if (!product) {
      throw new NotFoundException('해당 품목을 찾을 수 없습니다.');
    }

    return product;
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
  async findByCategory(category: string): Promise<Product[]> {
    return await this.productRepository.find({
      where: { category, status: 'active' },
      order: { productName: 'ASC' }
    });
  }

  // 공급업체별 품목 조회
  async findBySupplier(supplier: string): Promise<Product[]> {
    return await this.productRepository.find({
      where: { supplier, status: 'active' },
      order: { productName: 'ASC' }
    });
  }
}
