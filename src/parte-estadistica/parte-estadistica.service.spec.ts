import { Test, TestingModule } from '@nestjs/testing';
import { ParteEstadisticaService } from './parte-estadistica.service';

describe('ParteEstadisticaService', () => {
  let service: ParteEstadisticaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParteEstadisticaService],
    }).compile();

    service = module.get<ParteEstadisticaService>(ParteEstadisticaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
