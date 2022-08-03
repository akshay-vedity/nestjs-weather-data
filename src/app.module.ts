import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenWeatherModule } from './modules/open-weather/open-weather.module';

@Module({
  imports: [OpenWeatherModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
