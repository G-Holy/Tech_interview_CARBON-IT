import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload/treasure-map')
  @UseInterceptors(FileInterceptor('hunt'))
  uploadAdventure(@UploadedFile() hunt) {
    console.log(hunt);
    throw new Error('not implement yet');
  }

  @Get('download/treasures')
  downloadTreasures() {
    throw new Error('not implement yet');
  }
}
