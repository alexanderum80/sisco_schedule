import { DATASOURCE } from './datasource';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import 'dotenv/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContaConexionesModule } from './shared/modules/conta-conexiones/conta-conexiones.module';
import { DwhConexionesModule } from './shared/modules/dwh-conexiones/dwh-conexiones.module';
import { ParteEstadisticaModule } from './parte-estadistica/parte-estadistica.module';
import { ActualizarUnidadesComercialesModule } from './actualizar-unidades-comerciales/actualizar-unidades-comerciales.module';
import { CalculaConciliacionNacionalModule } from './calcula-conciliacion-nacional/calcula-conciliacion-nacional.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DATASOURCE.HOST_NAME,
      username: DATASOURCE.USER_NAME,
      password: DATASOURCE.PASSWORD,
      database: DATASOURCE.DATABASE_NAME,
      connectTimeoutMS: parseInt(DATASOURCE.CONNECTION_TIMEOUT),
      maxQueryExecutionTime: parseInt(DATASOURCE.REQUEST_TIMEOUT),
      entities: ['**/*.entity.js'],
      synchronize: false,
    }),
    ScheduleModule.forRoot(),
    // modulos comunes
    ContaConexionesModule,
    DwhConexionesModule,
    // modulos que contienen las tareas
    ParteEstadisticaModule,
    ActualizarUnidadesComercialesModule,
    CalculaConciliacionNacionalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
