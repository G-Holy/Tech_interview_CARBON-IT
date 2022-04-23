import { Inject, Injectable } from '@nestjs/common';
import { Fs, FS_TOKEN } from './dependencies/fs-dependency.provider';

type FileContent = string[];

@Injectable()
export class FileParsorProvider {
  constructor(@Inject(FS_TOKEN) private readonly fs: Fs) {}

  getFileContent(filePath: string): FileContent {
    return this.fs.readFileSync(filePath).toString().split('\n');
  }
}
