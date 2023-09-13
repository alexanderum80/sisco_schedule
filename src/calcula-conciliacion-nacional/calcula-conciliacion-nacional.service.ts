import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class CalculaConciliacionNacionalService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async calcularConciliacionNacional() {
    try {
      this.dataSource.query('CALL public.concext_llena_concilia_contabilidad();').catch(err => {
        console.log(err);
      });
    } catch (err) {
      console.log(err);
    }
  }
}
