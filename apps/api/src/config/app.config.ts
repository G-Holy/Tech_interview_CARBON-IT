import { merge } from 'lodash';

type FilePath = string;

interface AppConfig {
  uploadDirectoryPath: FilePath;
}

const defaultAppConfig: AppConfig = {
  uploadDirectoryPath: './files',
};

const envAppConfig: Partial<AppConfig> = {
  uploadDirectoryPath: process.env.UPLOAD_DIRECTORY_PATH,
};

export const appConfig = merge(defaultAppConfig, envAppConfig);
