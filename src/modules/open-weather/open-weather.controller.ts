import { OpenWeatherService } from './open-weather.service';
import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { ResponseSuccess } from 'src/dto/response.dto';
import { JoiValidationPipe } from 'src/pipe/joi-validation.pipe';
import { weatherValidation } from './open-weather.validation';

@Controller('weather')
export class OpenWeatherController {

    constructor(
        private readonly openWeatherService: OpenWeatherService
    ) { }

    @Get('info')
    @UsePipes(new JoiValidationPipe(weatherValidation))
    async findAll(@Query() params: any) {
        let result = await this.openWeatherService.fetchWeatherData(params);
        return new ResponseSuccess("Weather Data", result);
    }
}
