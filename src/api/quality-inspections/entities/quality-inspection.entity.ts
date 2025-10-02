import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('quality_inspections')
export class QualityInspection {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  qualityId: string;

  @Column()
  productCode: string;

  @Column()
  productName: string;

  @Column()
  batchNumber: string;

  @Column({ type: 'date' })
  inspectionDate: Date;

  @Column()
  inspector: string;

  @Column()
  inspectionType: string;

  @Column()
  status: string;

  @Column({ type: 'int' })
  quantityInspected: number;

  @Column({ type: 'int', default: 0 })
  quantityPassed: number;

  @Column({ type: 'int', default: 0 })
  quantityFailed: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  passRate: number;

  @Column({ nullable: true })
  defectType: string;

  @Column({ type: 'text', nullable: true })
  defectDescription: string;

  @Column({ type: 'text', nullable: true })
  remarks: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
