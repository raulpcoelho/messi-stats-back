import { Test, TestingModule } from '@nestjs/testing';
import { TotalsService } from './totals.service';

describe('TotalsService', () => {
  let service: TotalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TotalsService],
    }).compile();

    service = module.get<TotalsService>(TotalsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
