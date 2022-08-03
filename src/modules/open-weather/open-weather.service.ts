import { HttpService } from '@nestjs/axios';
import { Injectable, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OPEN_WEATHER_API_ENDPOINT } from 'src/utils/constants';

@Injectable()
export class OpenWeatherService {

    constructor(
        private readonly configService: ConfigService,
        private readonly httpService: HttpService
    ) {}

    async fetchWeatherData(params: any) {
        const API_KEY = this.configService.get<string>('OPEN_WEATHER_KEY');
        const response = await this.httpService
        .get(`${OPEN_WEATHER_API_ENDPOINT}/data/2.5/onecall?lat=${params.lat}&lon=${params.lng}&exclude=hourly,minutely,current&appid=${API_KEY}`)
        .toPromise()
        .catch((err) => {
            throw new HttpException(err.response.data, err.response.status);
        });

        return await this.getWeatherDescription(params.date, response.data);
    }

    async getWeatherDescription(date: any, result: any) {
        let startDate = Math.round(new Date(date).setHours(0, 0, 0) / 1000);
        let endDate = Math.round(new Date(date).setHours(23, 59, 59) / 1000);
        let weatherResult: any = result.daily.find((x: any) => x.dt >= startDate && x.dt <= endDate);
        return weatherResult.weather[0].description;
    }
}
