import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('shipments')
export class Shipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  shipmentId: string;

  @Column()
  orderId: string;

  @Column()
  customerName: string;

  @Column()
  productCode: string;

  @Column()
  productName: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'date' })
  shipmentDate: Date;

  @Column({ type: 'date', nullable: true })
  expectedDeliveryDate: Date;

  @Column({ default: 'preparing' })
  status: string;

  @Column({ default: 'normal' })
  priority: string;

  @Column({ nullable: true })
  carrier: string;

  @Column({ nullable: true })
  trackingNumber: string;

  @Column({ nullable: true })
  shippingAddress: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  shippingCost: number;

  @Column()
  responsiblePerson: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
