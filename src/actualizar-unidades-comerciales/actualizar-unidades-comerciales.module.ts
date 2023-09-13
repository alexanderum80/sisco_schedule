import { Module } from '@nestjs/common';
import { ActualizarUnidadesComercialesService } from './actualizar-unidades-comerciales.service';
import { DwhConexionesModule } from 'src/shared/modules/dwh-conexiones/dwh-conexiones.module';

@Module({
  imports: [DwhConexionesModule],
  providers: [ActualizarUnidadesComercialesService],
})
export class ActualizarUnidadesComercialesModule {}
