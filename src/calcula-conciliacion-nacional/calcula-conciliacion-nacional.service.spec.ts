import { Test, TestingModule } from '@nestjs/testing';
import { CalculaConciliacionNacionalService } from './calcula-conciliacion-nacional.service';

describe('CalculaConciliacionNacionalService', () => {
  let service: CalculaConciliacionNacionalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculaConciliacionNacionalService],
    }).compile();

    service = module.get<CalculaConciliacionNacionalService>(CalculaConciliacionNacionalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
