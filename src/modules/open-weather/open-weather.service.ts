import { Injectable } from '@nestjs/common';

@Injectable()
export class OpenWeatherService {

    async fetchWeatherData(params: any) {
        return {
            'name': "Test"
        }
    }
}
