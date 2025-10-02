import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('claims')
export class Claim {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  claimId: string;

  @Column()
  customerName: string;

  @Column()
  productCode: string;

  @Column()
  productName: string;

  @Column({ nullable: true })
  orderNumber: string;

  @Column()
  claimType: string;

  @Column({ type: 'date' })
  claimDate: Date;

  @Column({ type: 'text' })
  claimDescription: string;

  @Column({ default: 'pending' })
  status: string;

  @Column({ default: 'medium' })
  priority: string;

  @Column()
  assignedTo: string;

  @Column({ type: 'date', nullable: true })
  resolutionDate: Date;

  @Column({ type: 'text', nullable: true })
  resolutionDescription: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, default: 0 })
  compensationAmount: number;

  @Column({ nullable: true })
  compensationType: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
