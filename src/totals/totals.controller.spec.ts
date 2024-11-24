import { Test, TestingModule } from '@nestjs/testing';
import { TotalsController } from './totals.controller';

describe('TotalsController', () => {
  let controller: TotalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TotalsController],
    }).compile();

    controller = module.get<TotalsController>(TotalsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
