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

// TODO: find a cleaner way to type multer file
import { Express } from 'express';
import { Multer } from 'multer';

@Controller()
export class AppController {
  constructor(private readonly service: AppService) {}

  // TODO: return output file name after parsing/running?
  @Post('upload/treasure-map')
  @UseInterceptors(FileInterceptor('map'))
  uploadAdventure(@UploadedFile() mapFile: Express.Multer.File) {
    return this.service.uploadTreasureMap(mapFile);
  }

  @Get('download/treasures/:fileName')
  downloadTreasures(@Param('fileName') fileName: string) {
    return this.service.downloadTreasures(fileName);
  }
}
