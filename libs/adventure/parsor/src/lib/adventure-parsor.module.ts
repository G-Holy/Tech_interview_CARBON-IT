import { Module } from '@nestjs/common';
import { AdventureParsorService } from './adventure-parsor.service';
import { FsDependencyProvider } from './dependencies/fs-dependency.provider';
import { FileParsorProvider } from './file-parsor.provider';
import { CommandParsorModule } from './components/command-parsor/command-parsor.module';

@Module({
  imports: [CommandParsorModule],
  providers: [AdventureParsorService, FileParsorProvider, FsDependencyProvider],
  exports: [AdventureParsorService],
})
export class AdventureParsorModule {}
