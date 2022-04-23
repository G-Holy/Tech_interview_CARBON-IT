import { Module } from '@nestjs/common';
import { AdventureParsorService } from './adventure-parsor.service';
import { FsDependencyProvider } from './dependencies/fs-dependency.provider';
import { FileParsorProvider } from './file-parsor.provider';
import { InstructionParsorModule } from './components/instruction-parsor.module';

@Module({
  imports: [InstructionParsorModule],
  exports: [AdventureParsorService],
  providers: [AdventureParsorService, FileParsorProvider, FsDependencyProvider],
})
export class AdventureParsorModule {}
