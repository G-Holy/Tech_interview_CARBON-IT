import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import path = require('path');

// TODO: find a cleaner way to type multer file
import { Express } from 'express';
import { Multer } from 'multer';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  // TODO: return output file name after parsing/running?
  @Post('upload/treasure-map')
  @UseInterceptors(FileInterceptor('hunt'))
  uploadAdventure(@UploadedFile() hunt: Express.Multer.File) {
    this.service.generateAdventure(path.join(hunt.destination, hunt.filename));
  }

  @Get('download/treasures')
  downloadTreasures() {
    // TODO: pass file name returned from upload to parameter
    throw new Error('not implement yet');
  }
}
