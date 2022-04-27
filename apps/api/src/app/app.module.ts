import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { AdventureParserModule } from '@treasure-hunt/adventure-parser';
import { AdventureInterpreterModule } from '@treasure-hunt/adventure/interpreter';
import { appConfig } from '../config/app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MulterModule.register({ dest: appConfig.uploadDirectoryPath }),
    AdventureParserModule,
    AdventureInterpreterModule,
    // TODO: file manager class to create result file
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
