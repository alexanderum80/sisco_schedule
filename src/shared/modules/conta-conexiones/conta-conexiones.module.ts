import { ContaConexionesEntity } from './conta-conexiones.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ContaConexionesService } from './conta-conexiones.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContaConexionesEntity])],
  providers: [ContaConexionesService],
  exports: [ContaConexionesService],
})
export class ContaConexionesModule {}
