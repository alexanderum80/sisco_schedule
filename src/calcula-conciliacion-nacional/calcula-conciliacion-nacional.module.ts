import { Module } from '@nestjs/common';
import { CalculaConciliacionNacionalService } from './calcula-conciliacion-nacional.service';

@Module({
  providers: [CalculaConciliacionNacionalService],
})
export class CalculaConciliacionNacionalModule {}
