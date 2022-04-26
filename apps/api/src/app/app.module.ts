import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { AdventureParserModule } from '@treasure-hunt/adventure-parser';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MulterModule.register({ dest: './files' }), AdventureParserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
