import { ContaEstadisticaEntity } from './entities/conta-estadistica.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContaConexionesModule } from '../shared/modules/conta-conexiones/conta-conexiones.module';
import { Module } from '@nestjs/common';
import { ParteEstadisticaService } from './parte-estadistica.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContaEstadisticaEntity]), ContaConexionesModule],
  providers: [ParteEstadisticaService],
  exports: [ParteEstadisticaService],
})
export class ParteEstadisticaModule {}
