import { Injectable } from '@nestjs/common';
import * as path from 'path';
// TODO: config class
import { appConfig } from '../config/app.config';
import { AdventureParserService } from '@treasure-hunt/adventure-parser';
import { AdventureInterpreter } from '@treasure-hunt/adventure/interpreter';

@Injectable()
export class AppService {
  constructor(
    private readonly adventureParser: AdventureParserService,
    private readonly adventureInterpreter: AdventureInterpreter
  ) {}

  async downloadTreasures(mapFileName: string) {
    const mapFilePath = this.getMapFilePath(
      appConfig.uploadDirectoryPath,
      mapFileName
    );
    const commands = await this.adventureParser.parseAdventure(mapFilePath);
    console.log('PARSE: ', commands);

    const resultFile = await this.adventureInterpreter.generateAdventure(
      commands
    );
    console.log('GENERATE :', resultFile);
    // TODO: return resultFile stream

    return undefined;
  }

  uploadTreasureMap(mapFile: Express.Multer.File) {
    // TODO: manage uploading big files and exceptions
    return { mapFileName: mapFile.filename };
  }

  private getMapFilePath(uploadDirectoryPath: string, mapFileName: string) {
    return path.join(uploadDirectoryPath, mapFileName);
  }
}
