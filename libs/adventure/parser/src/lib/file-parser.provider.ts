import { Inject, Injectable } from '@nestjs/common';
import { FileContent } from '@treasure-hunt/adventure/core';
import { Fs, FS_TOKEN } from './dependencies/fs-dependency.provider';

@Injectable()
export class FileParserProvider {
  constructor(@Inject(FS_TOKEN) private readonly fs: Fs) {}

  getFileContent(filePath: string): FileContent {
    return this.fs.readFileSync(filePath).toString().split('\n');
  }
}
