import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getCode(@Req() request: Request): [string, string[][]] {
    return this.appService.getCode(request.query.bias.toString());
  }
}
