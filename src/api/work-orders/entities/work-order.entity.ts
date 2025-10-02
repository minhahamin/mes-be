import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('work_orders')
export class WorkOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  orderId: string;

  @Column({ nullable: true })
  planId: string;

  @Column()
  productCode: string;

  @Column()
  productName: string;

  @Column({ type: 'int' })
  orderQuantity: number;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ default: 'pending' })
  status: string;

  @Column({ default: 'normal' })
  priority: string;

  @Column()
  workCenter: string;

  @Column()
  supervisor: string;

  @Column()
  operator: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  estimatedHours: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  actualHours: number;

  @Column({ nullable: true })
  qualityStandard: string;

  @Column({ type: 'simple-array', nullable: true })
  materials: string[];

  @Column({ type: 'text', nullable: true })
  instructions: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
