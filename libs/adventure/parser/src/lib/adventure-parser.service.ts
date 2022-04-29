import { Injectable } from '@nestjs/common';
import { CommandParserService } from './components/command-parser/command-parser.service';
import { FileParserProvider } from './file-parser.provider';

@Injectable()
export class AdventureParserService {
  constructor(
    private readonly fileParser: FileParserProvider,
    private readonly commandParser: CommandParserService
  ) {}
  parseAdventure(mapFilePath: string) {
    const fileContent = this.fileParser.getFileContent(mapFilePath);
    const commands = this.commandParser.parseFileContent(fileContent);
    return commands;
  }
}
