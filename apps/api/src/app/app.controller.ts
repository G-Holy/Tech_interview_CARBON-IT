import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

import { Express } from 'express';
/* https://www.npmjs.com/package/@types/multer way to add Multer type to Express object */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Multer } from 'multer';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  @Post('upload/treasure-map')
  @UseInterceptors(FileInterceptor('map'))
  uploadAdventure(@UploadedFile() mapFile: Express.Multer.File) {
    return this.service.uploadTreasureMap(mapFile);
  }
}
