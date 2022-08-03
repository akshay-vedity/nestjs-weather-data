import { OpenWeatherService } from './open-weather.service';
import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { ResponseSuccess } from 'src/dto/response.dto';
import { JoiValidationPipe } from 'src/pipe/joi-validation.pipe';
import { weatherValidation } from './open-weather.validation';

@Controller('open-weather')
export class OpenWeatherController {

    constructor(
        private readonly openWeatherService: OpenWeatherService
    ) { }

    @Get()
    @UsePipes(new JoiValidationPipe(weatherValidation))
    async findAll(@Query() params: any) {
        let result = await this.openWeatherService.fetchWeatherData(params);
        return new ResponseSuccess("List", result);
    }
}
