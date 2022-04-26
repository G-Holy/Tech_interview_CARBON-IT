import { Module } from '@nestjs/common';
import { InstructionFactoryProvider } from './instruction-factory.provider';
import { InstructionParsorService } from './instruction-parsor.service';
import { LexorProvider } from './lexor.provider';

@Module({
  providers: [
    InstructionParsorService,
    InstructionFactoryProvider,
    LexorProvider,
  ],
  exports: [InstructionParsorService],
})
export class InstructionParsorModule {}
