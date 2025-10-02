import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryStatusController } from './controllers/inventory-status.controller';
import { InventoryStatusService } from './services/inventory-status.service';
import { Inventory } from '../inventory/entities/inventory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory])],
  controllers: [InventoryStatusController],
  providers: [InventoryStatusService],
  exports: [InventoryStatusService],
})
export class InventoryStatusModule {}
