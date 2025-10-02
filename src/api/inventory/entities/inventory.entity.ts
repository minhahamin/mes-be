import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('inventory')
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  productCode: string;

  @Column()
  productName: string;

  @Column()
  category: string;

  @Column({ type: 'int', default: 0 })
  currentStock: number;

  @Column({ type: 'int', default: 0 })
  minStock: number;

  @Column({ type: 'int', default: 0 })
  maxStock: number;

  @Column({ type: 'int', default: 0 })
  reorderPoint: number;

  @Column({ default: 'sufficient' })
  status: string;

  @Column({ type: 'date', nullable: true })
  lastUpdated: Date;

  @Column()
  location: string;

  @Column()
  supplier: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  unitCost: number;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  totalValue: number;

  @Column({ type: 'date', nullable: true })
  lastMovementDate: Date;

  @Column({ nullable: true })
  movementType: string;

  @Column({ type: 'int', default: 0 })
  movementQuantity: number;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
