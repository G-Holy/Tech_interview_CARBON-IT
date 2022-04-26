import { Injectable } from '@nestjs/common';
import { CommandParsorService } from './components/command-parsor/command-parsor.service';
import { FileParsorProvider } from './file-parsor.provider';

@Injectable()
export class AdventureParsorService {
  constructor(
    private readonly fileParsor: FileParsorProvider,
    private readonly commandParsor: CommandParsorService
  ) {}
  async parseAdventure(adventurePath: string) {
    const fileContent = this.fileParsor.getFileContent(adventurePath);
    const commands = this.commandParsor.parseFileContent(fileContent);

    return commands;
  }
}
