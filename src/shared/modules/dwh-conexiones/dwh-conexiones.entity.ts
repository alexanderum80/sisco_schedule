import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('dwh_conexiones')
export class DWHConexiones {
  @PrimaryColumn({ name: 'id_unidad' })
  IdUnidad: number;

  @Column({ name: 'conexion_rest' })
  ConexionRest?: string;

  @Column({ name: 'conexion_dwh' })
  ConexionDWH?: string;
}
