import { DWHConexiones } from './dwh-conexiones.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DwhConexionesService } from './dwh-conexiones.service';
import { CryptoService } from 'src/shared/services/crypto.service';

@Module({
  imports: [TypeOrmModule.forFeature([DWHConexiones])],
  providers: [DwhConexionesService, CryptoService],
  exports: [DwhConexionesService],
})
export class DwhConexionesModule {}
