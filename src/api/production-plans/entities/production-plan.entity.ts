import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('production_plans')
export class ProductionPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  planId: string;

  @Column()
  productCode: string;

  @Column()
  productName: string;

  @Column({ type: 'int' })
  planQuantity: number;

  @Column({ type: 'date' })
  plannedStartDate: Date;

  @Column({ type: 'date' })
  plannedEndDate: Date;

  @Column({ type: 'date', nullable: true })
  actualStartDate: Date;

  @Column({ type: 'date', nullable: true })
  actualEndDate: Date;

  @Column({ default: 'pending' })
  status: string;

  @Column({ default: 'normal' })
  priority: string;

  @Column()
  workCenter: string;

  @Column()
  responsiblePerson: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  estimatedHours: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  actualHours: number;

  @Column({ type: 'simple-array', nullable: true })
  materials: string[];

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
