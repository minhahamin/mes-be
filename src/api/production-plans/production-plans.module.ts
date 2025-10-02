import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductionPlansController } from './controllers/production-plans.controller';
import { ProductionPlansService } from './services/production-plans.service';
import { ProductionPlan } from './entities/production-plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductionPlan])],
  controllers: [ProductionPlansController],
  providers: [ProductionPlansService],
  exports: [ProductionPlansService],
})
export class ProductionPlansModule {}
