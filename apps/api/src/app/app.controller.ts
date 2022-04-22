import { Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  uploadAdventureFile() {
    throw new Error('not implement yet');
  }

  @Get()
  downloadHuntResultFile() {
    throw new Error('not implement yet');
  }
}
