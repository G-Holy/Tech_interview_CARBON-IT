import { Provider } from '@nestjs/common';
import * as fs from 'fs';

export type Fs = typeof fs;

export const FS_TOKEN = Symbol('FS_TOKEN');
export const FsDependencyProvider: Provider = {
  provide: FS_TOKEN,
  useValue: fs,
};
