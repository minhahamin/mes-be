import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('receipts')
export class Receipt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  receiptId: string;

  @Column()
  orderingId: string;


  @Column({ nullable: true })
  supplierId: string;

  @Column()
  supplierName: string;

  @Column()
  productName: string;

  @Column()
  productCode: string;

  @Column({ type: 'int' })
  orderedQuantity: number;

  @Column({ type: 'int' })
  receivedQuantity: number;

  @Column({ type: 'date' })
  deliveryDate: Date;

  @Column({ type: 'date', nullable: true })
  receivedDate: Date;

  @Column()
  warehouseLocation: string;

  @Column({ default: 'pending' })
  status: string;

  @Column()
  manager: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
