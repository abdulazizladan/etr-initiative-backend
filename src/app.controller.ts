import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  /**@Get()
  getHello(): string {
    return this.appService.getHello();
  }*/
  @Get()
  getRoot() {
    return {
      service: 'ETR Initiative API',
      status: 'online',
      docs: '/api/docs',
      version: '1.0.0',
    };
  }
}
