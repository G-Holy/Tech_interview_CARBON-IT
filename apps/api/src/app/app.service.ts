import { Injectable } from '@nestjs/common';
import * as path from 'path';
// TODO: config class
import { appConfig } from '../config/app.config';
import { AdventureParserService } from '@treasure-hunt/adventure-parser';
import { AdventureInterpreter } from '@treasure-hunt/adventure/interpreter';

@Injectable()
export class AppService {
  constructor(
    private readonly parser: AdventureParserService,
    private readonly interpreter: AdventureInterpreter
  ) {}

  async downloadTreasures(mapFileName: string) {
    const mapFilePath = this.getMapFilePath(
      appConfig.uploadDirectoryPath,
      mapFileName
    );
    const commands = this.parser.parseAdventure(mapFilePath);
    const simulationResult = this.interpreter.interpreteSimulation(commands);
    return simulationResult;
  }

  uploadTreasureMap(mapFile: Express.Multer.File) {
    return { mapFileName: mapFile.filename };
  }

  private getMapFilePath(uploadDirectoryPath: string, mapFileName: string) {
    return path.join(uploadDirectoryPath, mapFileName);
  }
}
