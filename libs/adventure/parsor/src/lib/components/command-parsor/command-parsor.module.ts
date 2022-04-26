import { Module } from '@nestjs/common';
import { CommandParsorService } from './command-parsor.service';
import { CommandParsorFactoryProvider } from './command-parsor-factory.provider';
import { CommandLexorProvider } from './command-lexor.provider';

@Module({
  providers: [
    CommandParsorService,
    CommandParsorFactoryProvider,
    CommandLexorProvider,
  ],
  exports: [CommandParsorService],
})
export class CommandParsorModule {}
