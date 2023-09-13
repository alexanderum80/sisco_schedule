import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('conta_estadistica')
export class ContaEstadisticaEntity {
  @Column({ name: 'id_division' })
  IdDivision: number;

  @Column({ name: 'division' })
  Division: string;

  @PrimaryColumn({ name: 'id_centro' })
  IdCentro: number;

  @Column({ name: 'centro' })
  Centro: string;

  @PrimaryColumn({ name: 'consolidado' })
  Consolidado: boolean;

  @Column({ name: 'anno' })
  Anno: number;

  @Column({ name: 'periodo' })
  Periodo: number;

  @Column({ name: 'fecha_actualizacion' })
  FechaActualizacion?: Date;

  @Column({ name: 'fecha_inicio' })
  FechaInicio?: Date;

  @Column({ name: 'fecha_fin' })
  FechaFin?: Date;

  @Column({ name: 'comprobantes' })
  Comprobantes: number;

  @Column({ name: 'traspasados' })
  Traspasados: number;

  @Column({ name: 'sin_traspasar' })
  SinTraspasar: number;

  @Column({ name: 'inconclusos' })
  Inconclusos: number;

  @Column({ name: 'anulados' })
  Anulados: number;

  @Column({ name: 'conexion', default: false })
  Conexion: boolean;
}
