import { Module } from '@nestjs/common';
import { InstructionFactoryProvider } from './instruction-factory.provider';
import { InstructionParsorService } from './instruction-parsor.service';

@Module({
  providers: [InstructionParsorService, InstructionFactoryProvider],
  exports: [InstructionParsorService],
})
export class InstructionParsorModule {}
