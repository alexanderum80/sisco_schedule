import { PrimaryColumn, ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity('v_centros')
export class CentrosView {
  @ViewColumn({ name: 'id_unidad' })
  @PrimaryColumn({ name: 'id_unidad' })
  IdUnidad: number;

  @ViewColumn({ name: 'nombre' })
  Nombre: string;

  @ViewColumn({ name: 'id_subdivision' })
  IdSubdivision: number;

  @ViewColumn({ name: 'subdivision' })
  Subdivision: string;

  @ViewColumn({ name: 'id_division' })
  IdDivision: number;

  @ViewColumn({ name: 'division' })
  Division: string;
}
