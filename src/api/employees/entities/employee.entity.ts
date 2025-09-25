import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: true })
  employeeId: string;

  @Column()
  name: string;

  @Column()
  department: string;

  @Column()
  position: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column({ type: 'date' })
  hireDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 0 })
  salary: number;

  @Column({ default: 'active' })
  status: string;

  @Column()
  address: string;

  @Column()
  emergencyContact: string;

  @Column()
  emergencyPhone: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
