import { Test, TestingModule } from '@nestjs/testing';
import { OpenWeatherController } from './open-weather.controller';

describe('OpenWeatherController', () => {
  let controller: OpenWeatherController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpenWeatherController],
    }).compile();

    controller = module.get<OpenWeatherController>(OpenWeatherController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
