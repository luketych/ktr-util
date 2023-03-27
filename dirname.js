import fs from 'fs'
import path from 'path'


function _fileExists(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}


/**
 * @param {*} dirname __dirname
 * @param {*} pkgName from package.json
 * @returns 
 */
function getPkgDirname(dirname, pkgName) {
  if (!dirname.includes('.yarn')) return dirname

  const files = fs.readdirSync(dirname.split('.yarn')[0], { withFileTypes: true })

  const visibleFolders = files
  .filter(file => file.isDirectory() && !file.name.startsWith('.'))
  .map(file => file.name)

  for (const dir of visibleFolders) {
    let potentialPath = path.join(dirname.split('.yarn')[0], dir, pkgName.split('/').at(-1))
    
    if (_fileExists(potentialPath)) {
      return potentialPath
    }
  }
}


function getKtrSrtRootDir(dirname) {
  if (!dirname.includes('@ktr-srt')) throw new Error('Not in ktr-srt workspace')
  const rootDir = dirname.split('/').slice(0, -1).join('/');
  return rootDir;
}


export { getPkgDirname, getKtrSrtRootDir }