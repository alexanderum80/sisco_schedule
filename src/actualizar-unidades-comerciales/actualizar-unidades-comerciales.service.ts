import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectDataSource } from '@nestjs/typeorm';
import { DwhConexionesService } from 'src/shared/modules/dwh-conexiones/dwh-conexiones.service';
import { DataSource } from 'typeorm';

@Injectable()
export class ActualizarUnidadesComercialesService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource, private _dwhConexionesSvc: DwhConexionesService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async actualizaUnidadesComeciales() {
    let _conexionDHW;
    try {
      // obtengo conexion a la BD del
      _conexionDHW = await this._dwhConexionesSvc.conexionRestEmpresa().catch(err => {
        console.log(err);
        return;
      });

      // actualizo las divisiones
      await this._actualizarDivisiones(_conexionDHW).catch(err => {
        console.log(err);
      });

      // actualizo las subdivisiones
      await this._actualizarSubdivisiones(_conexionDHW).catch(err => {
        console.log(err);
      });

      // actualizo las unidades
      await this._actualizarUnidades(_conexionDHW).catch(err => {
        console.log(err);
      });

      // cierro la conexion al servidor DWH
      if (_conexionDHW.isInitialized) _conexionDHW.destroy();
    } catch (err) {
      if (_conexionDHW.isInitialized) _conexionDHW.destroy();
      console.log(err);
    }
  }

  async _actualizarDivisiones(_conexionDHW: DataSource): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      _conexionDHW
        .query('SELECT IdDivision as id_division, Division as division FROM [UnidadesComerciales].[dbo].[Divisiones]')
        .then(res => {
          this.dataSource
            .query('CALL actualiza_divisiones ($1::json)', [JSON.stringify(res)])
            .then(() => {
              resolve();
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  async _actualizarSubdivisiones(_conexionDHW: DataSource): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      _conexionDHW
        .query('SELECT IdSubdivision as id_subdivision, IdDivision as id_division, Subdivision as subdivision FROM [UnidadesComerciales].[dbo].[Subdivisiones]')
        .then(res => {
          this.dataSource
            .query('CALL actualiza_subdivisiones ($1::json)', [JSON.stringify(res)])
            .then(() => {
              resolve();
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  async _actualizarUnidades(_conexionDHW: DataSource): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      _conexionDHW
        .query(
          `SELECT U.IdUnidad as id_unidad, U.IdDivision as id_division, U.IdSubdivision as id_subdivision, U.Nombre as nombre, U.IdTipo as tipo, U.Abierta as abierta, P.IdProvincia as provincia, 
              CASE WHEN ISNULL(C.CantUnidad, 0) > 1 THEN C.IdSubdivision ELSE 0 END AS id_complejo
          FROM UnidadesComerciales.dbo.UnidadesComerciales AS U INNER JOIN
             UnidadesComerciales.dbo.Municipio AS M ON U.IdMunicipio = M.IdMunicipio INNER JOIN
             UnidadesComerciales.dbo.Provincia AS P ON M.IdProvincia = P.IdProvincia LEFT OUTER JOIN
          (SELECT Subdivisiones.IdSubdivision, COUNT(IdUnidad) AS CantUnidad
            FROM dbo.Subdivisiones INNER JOIN UnidadesComerciales.dbo.UnidadesComerciales AS UC
            ON UC.IdSubdivision = Subdivisiones.IdSubdivision
            GROUP BY Subdivisiones.IdSubdivision) AS C 
          ON C.IdSubdivision = U.IdSubdivision`,
        )
        .then(res => {
          this.dataSource
            .query('CALL actualiza_unidades ($1::json)', [JSON.stringify(res)])
            .then(() => {
              resolve();
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
