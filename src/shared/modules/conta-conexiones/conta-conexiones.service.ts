import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { cloneDeep } from 'lodash';
import { ContaConexionesEntity } from './conta-conexiones.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ContaConexionesService {
  constructor(@InjectRepository(ContaConexionesEntity) private readonly conexionesRespository: Repository<ContaConexionesEntity>) {}

  async findAll(): Promise<ContaConexionesEntity[]> {
    try {
      return new Promise<ContaConexionesEntity[]>((resolve, reject) => {
        this.conexionesRespository
          .find({
            relations: {
              Division: true,
              Unidad: true,
            },
          })
          .then(result => {
            resolve(result);
          })
          .catch(err => {
            reject(err.message || err);
          });
      });
    } catch (err: any) {
      return Promise.reject(err.message || err);
    }
  }

  async conexionRodas(contaConexion: ContaConexionesEntity): Promise<DataSource> {
    const DEFAULT_POSTGRES_CONNECTION_STRING: PostgresConnectionOptions = {
      type: 'postgres',
      host: '',
      username: 'r4_sisco',
      password: 'aqntjstE.2008',
      database: '',
      connectTimeoutMS: 60000,
      maxQueryExecutionTime: 180000,
      synchronize: false,
    };

    const _conexionOptions = cloneDeep(DEFAULT_POSTGRES_CONNECTION_STRING);
    Object.defineProperties(_conexionOptions, {
      host: {
        value: contaConexion.IpRodas,
      },
      database: {
        value: `r4_${contaConexion.BaseDatos.toLowerCase()}`,
      },
    });

    const _rodasDataSource: DataSource = await new DataSource(_conexionOptions).initialize();

    return new Promise<DataSource>(resolve => {
      resolve(_rodasDataSource);
    });
  }
}
