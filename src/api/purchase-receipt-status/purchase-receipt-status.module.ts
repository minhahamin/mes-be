import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseReceiptStatusController } from './controllers/purchase-receipt-status.controller';
import { PurchaseReceiptStatusService } from './services/purchase-receipt-status.service';
import { Purchase } from '../purchases/entities/purchase.entity';
import { Receipt } from '../receipts/entities/receipt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, Receipt])],
  controllers: [PurchaseReceiptStatusController],
  providers: [PurchaseReceiptStatusService],
  exports: [PurchaseReceiptStatusService],
})
export class PurchaseReceiptStatusModule {}
