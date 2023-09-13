import { DWHConexiones } from './dwh-conexiones.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CryptoService } from 'src/shared/services/crypto.service';

@Injectable()
export class DwhConexionesService {
  private readonly EMPRESA_CODIGO = 100;

  constructor(@InjectRepository(DWHConexiones) private readonly dwhConexionesRepository: Repository<DWHConexiones>, private _cryptoService: CryptoService) {}

  async conexionRestEmpresa(): Promise<DataSource> {
    const _connectionQuery = await this._DWHConexion(this.EMPRESA_CODIGO).catch(err => {
      throw new Error(err);
    });

    const _connectionOptions = JSON.parse(await this._cryptoService.decrypt(_connectionQuery.ConexionRest));
    return new DataSource(_connectionOptions).initialize();
  }

  private async _DWHConexion(idDivision: number): Promise<DWHConexiones> {
    return new Promise<DWHConexiones>((resolve, reject) => {
      this.dwhConexionesRepository
        .findOne({ where: [{ IdUnidad: idDivision }] })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err.message || err);
        });
    });
  }
}
