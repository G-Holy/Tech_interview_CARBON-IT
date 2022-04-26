import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { AdventureParsorModule } from '@treasure-hunt/adventure/parsor';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [MulterModule.register({ dest: './files' }), AdventureParsorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
