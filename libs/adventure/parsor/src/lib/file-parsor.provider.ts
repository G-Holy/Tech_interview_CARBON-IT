import { Inject, Injectable } from '@nestjs/common';
import { FileContent } from '@treasure-hunt/adventure/types';
import { Fs, FS_TOKEN } from './dependencies/fs-dependency.provider';

@Injectable()
export class FileParsorProvider {
  constructor(@Inject(FS_TOKEN) private readonly fs: Fs) {}

  getFileContent(filePath: string): FileContent {
    return this.fs.readFileSync(filePath).toString().split('\n');
  }
}
