import { Module } from '@nestjs/common';
import { AdventureParserService } from './adventure-parser.service';
import { FsDependencyProvider } from './dependencies/fs-dependency.provider';
import { FileParserProvider } from './file-parser.provider';
import { CommandParserModule } from './components/command-parser/command-parser.module';

@Module({
  imports: [CommandParserModule],
  providers: [AdventureParserService, FileParserProvider, FsDependencyProvider],
  exports: [AdventureParserService],
})
export class AdventureParserModule {}
