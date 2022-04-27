import { merge } from 'lodash';
import path = require('path');

type FilePath = string;

interface AppConfig {
  uploadDirectoryPath: FilePath;
}

const defaultAppConfig: AppConfig = {
  uploadDirectoryPath: path.join(__dirname, './maps'),
};

const envAppConfig: Partial<AppConfig> = {
  uploadDirectoryPath: process.env.UPLOAD_DIRECTORY_PATH,
};

export const appConfig = merge(defaultAppConfig, envAppConfig);
