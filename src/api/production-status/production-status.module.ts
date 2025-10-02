import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionStatusController } from './controllers/production-status.controller';
import { ProductionStatusService } from './services/production-status.service';
import { ProductionPlan } from '../production-plans/entities/production-plan.entity';
import { WorkOrder } from '../work-orders/entities/work-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductionPlan, WorkOrder])],
  controllers: [ProductionStatusController],
  providers: [ProductionStatusService],
  exports: [ProductionStatusService],
})
export class ProductionStatusModule {}
