import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { OpenWeatherController } from './open-weather.controller';
import { OpenWeatherService } from './open-weather.service';

@Module({
  imports: [HttpModule],
  controllers: [OpenWeatherController],
  providers: [OpenWeatherService]
})
export class OpenWeatherModule {}
