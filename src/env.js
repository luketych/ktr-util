import * as dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'


function _removeDuplicateKeys(envVars) {
  const result = [];

  // Sort the environment variables by filePath depth (deepest first)
  const sortedEnvVars = envVars.sort((a, b) => {
    const aDepth = a.filePath.split('/').length;
    const bDepth = b.filePath.split('/').length;

    if (aDepth > bDepth) {
      return -1;
    } else if (aDepth < bDepth) {
      return 1;
    } else {
      return 0;
    }
  });

  // Loop through each environment variable and add to result if it's not a duplicate
  for (const envVar of sortedEnvVars) {
    const duplicateIndex = result.findIndex(
      (resultVar) => resultVar.key === envVar.key
    );
    if (duplicateIndex === -1) {
      result.push(envVar);
    } else {
      const duplicateVar = result[duplicateIndex];
      const duplicateDepth = duplicateVar.filePath.split('/').length;
      const envVarDepth = envVar.filePath.split('/').length;
      if (envVarDepth > duplicateDepth) {
        result.splice(duplicateIndex, 1, envVar);
      }
    }
  }

  return result;
}


function _traverseForEnvironmentVariables(currentPath) {

  if (!currentPath.includes('@ktr-srt')) return []

  const envVars = [];


  const files = fs.readdirSync(currentPath);

  // Loop through each file/directory and import .env files or traverse up the directory
  for (const file of files) {
    const filePath = path.join(currentPath, file);

    if (path.extname(file) === '.env' || file === '.env') {
      // Import the .env file
      const envConfig = dotenv.parse(fs.readFileSync(filePath));
      
      for (const key in envConfig) {
        envVars.push({
          key,
          value: envConfig[key],
          filePath,
        });
      }
    }
  }

  let retVal = envVars.concat( importAllEnvironmentVariables(path.join(currentPath, '..')) )

  retVal = _removeDuplicateKeys(retVal)

  return retVal
}


function importAllEnvironmentVariables(currentPath) {
    let envars = _traverseForEnvironmentVariables(currentPath)
    return _removeDuplicateKeys(envars)
}


/** prefix __STR__
 *  @param {string} prefix
 *  @param {string} envPath
 *  @returns {object} envars 
 */
function importEnvironmentVariables({ prefix='', envPath='.' }) {
  const filename = envPath.split('/').pop()
  
  if (filename !== '.env') envPath = path.join(envPath, "/", '.env')

  dotenv.config({ "path": envPath })

  const envars = {}
  
  try {
    if (prefix) {
      for (let envar in process.env) {
        if (!envar.startsWith('__SRT__')) continue

        let tail = envar.split('__SRT__')[1]
        envars[tail] = process.env[envar]

        // delete because if we don't then workspace envars and project envars will be merged
        delete process.env[envar]
      }
    } else {
      for (let envar in process.env) {
        envars[envar] = process.env[envar]
        delete process.env[envar]
      }
    }
  } catch (err) {
      console.error(err)
      process.exit(1)
  }

  return envars
}


export { importAllEnvironmentVariables, importEnvironmentVariables }