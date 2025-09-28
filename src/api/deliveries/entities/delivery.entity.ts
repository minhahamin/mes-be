import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('deliveries')
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  deliveryId: string;

  @Column()
  shipmentId: string;

  @Column()
  customerName: string;

  @Column()
  deliveryAddress: string;

  @Column({ type: 'date' })
  deliveryDate: Date;

  @Column({ nullable: true })
  expectedTime: string;

  @Column({ default: 'scheduled' })
  status: string;

  @Column({ default: 'normal' })
  priority: string;

  @Column()
  driver: string;

  @Column({ nullable: true })
  vehicle: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  deliveryFee: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
