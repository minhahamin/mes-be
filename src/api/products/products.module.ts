import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';
import { Product } from './entities/product.entity';
import { Inventory } from '../inventory/entities/inventory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Inventory])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
