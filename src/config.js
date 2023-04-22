// in .env file set these variables:
// NODE_ENV=production
// BACKTEST=0


import dotenv from 'dotenv'
import path from 'path'

import defaultConfig from './default.json' assert {type:'json'}
import developmentConfig from './development.json' assert {type:'json'}
import productionConfig from './production.json' assert {type:'json'}

import backtestConfig from './backtest.json' assert {type:'json'}


// walk up the directory tree until we find a .env file
const loadEnv = () => {
  let envPath = process.cwd();
  while (true) {
    const envFilePath = path.join(envPath, '.env');
    const result = dotenv.config({ path: envFilePath });
    if (result.error || !result.parsed) {
      const parentDir = path.resolve(envPath, '..');
      if (parentDir === envPath) {
        console.error(`Error: No .env file found in ${process.cwd()} or any parent directory`);
        process.exit(1);
      }
      envPath = parentDir;
    } else {
      console.log(`Loaded environment variables from ${envFilePath}`);
      return result.parsed;
    }
  }
}

loadEnv()


const env = process.env.NODE_ENV || 'default'
const backtest = process.env.BACKTEST || 0

let config = defaultConfig

if (env === 'development') {
  config = { ...config, ...developmentConfig }
}
else if (env === 'production') {
  config = { ...config, ...productionConfig }
}

if (backtest) config = { ...config, ...backtestConfig }


export default config