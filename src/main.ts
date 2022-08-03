import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import { AllExceptionsFilter } from 'src/filters/all-exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {

  let app: any = [];

  expressWinston.requestWhitelist.push('body');
  expressWinston.responseWhitelist.push('body');

  const logFormat = winston.format.printf(function (info) {
    let start = "\n======================== START REQUEST ================================"
    let time = `UTC Time: ${ Date() } | India Time: ${ new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }) } | USA Time: ${ new Date().toLocaleString("en-US", { timeZone: "America/New_York" }) }`
    let URL = `${ info.level } ${ info.message }`
    let Headers = `Headers: ${ JSON.stringify(info.meta.req.headers, null, 0) }`
    let params = `Request Body: ${ JSON.stringify(info.meta.req.body, null, 0) }`
    let resCode = `Response Code: ${ info.meta.res.statusCode }`
    let resBody = `Response Body: ${ JSON.stringify(info.meta.res.body, null, 0) }`
    let end = "======================== END REQUEST ==================================\n"
    return [start, time, URL, Headers, params, resCode, resBody, end].join("\n");
  });

  app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  app.use(expressWinston.logger({
    format: logFormat,
    transports: [
      new winston.transports.Console({
        // json: false,
        // colorize: true,
        // timestamp: true,
        // align: true
      })
    ]
  }));

  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(port).then(() => {
    console.log(`🚀 Server ready at ${port}`);
  });
}
bootstrap();
