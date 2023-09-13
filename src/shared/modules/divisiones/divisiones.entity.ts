import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('divisiones')
export class DivisionesEntity {
  @PrimaryGeneratedColumn({ name: 'id_division' })
  IdDivision: number;

  @Column({ name: 'division' })
  Division: string;
}
