import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QualityInspectionsController } from './controllers/quality-inspections.controller';
import { QualityInspectionsService } from './services/quality-inspections.service';
import { QualityInspection } from './entities/quality-inspection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QualityInspection])],
  controllers: [QualityInspectionsController],
  providers: [QualityInspectionsService],
  exports: [QualityInspectionsService],
})
export class QualityInspectionsModule {}
