import { Test, TestingModule } from '@nestjs/testing';
import { ActualizarUnidadesComercialesService } from './actualizar-unidades-comerciales.service';

describe('ActualizarUnidadesComercialesService', () => {
  let service: ActualizarUnidadesComercialesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActualizarUnidadesComercialesService],
    }).compile();

    service = module.get<ActualizarUnidadesComercialesService>(ActualizarUnidadesComercialesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
