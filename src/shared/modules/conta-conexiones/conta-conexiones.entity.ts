import { CentrosView } from '../unidades/unidades.entity';
import { DivisionesEntity } from '../divisiones/divisiones.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'conta_conexiones' })
export class ContaConexionesEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  Id: number;

  @Column({ name: 'id_unidad' })
  IdUnidad: number;

  @ManyToOne(() => CentrosView, centros => centros.IdUnidad)
  @JoinColumn({ name: 'id_unidad', referencedColumnName: 'IdUnidad' })
  Unidad?: CentrosView;

  @Column({ name: 'consolidado' })
  Consolidado: boolean;

  @Column({ name: 'id_division' })
  IdDivision: number;

  @ManyToOne(() => DivisionesEntity, divisiones => divisiones.IdDivision)
  @JoinColumn({ name: 'id_division', referencedColumnName: 'IdDivision' })
  Division: DivisionesEntity;

  @Column({ name: 'ip_rodas' })
  IpRodas: string;

  @Column({ name: 'base_datos' })
  BaseDatos: string;

  @Column('timestamp', { name: 'fecha_actualizacion' })
  FechaActualizacion?: Date;
}
