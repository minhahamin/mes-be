import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('purchases')
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  orderId: string;

  @Column()
  supplierId: string;

  @Column()
  supplierName: string;

  @Column()
  productCode: string;

  @Column()
  productName: string;

  @Column({ type: 'int' })
  orderQuantity: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  unitPrice: number;

  @Column({ type: 'decimal', precision: 15, scale: 2 })
  totalAmount: number;

  @Column({ type: 'date' })
  orderDate: Date;

  @Column({ type: 'date', nullable: true })
  expectedDeliveryDate: Date;

  @Column({ default: 'pending' })
  status: string;

  @Column({ default: 'normal' })
  priority: string;

  @Column()
  purchaser: string;

  @Column({ nullable: true })
  paymentTerms: string;

  @Column({ nullable: true })
  deliveryAddress: string;

  @Column({ type: 'text', nullable: true })
  specialRequirements: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
