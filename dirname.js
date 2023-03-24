function _fileExists(filePath) {
  try {
    fs.accessSync(filePath, fs.constants.F_OK);
    return true;
  } catch (err) {
    return false;
  }
}


function getPkgDir() {
  if (!__dirname.includes('.yarn')) return __dirname

  const files = fs.readdirSync(__dirname.split('.yarn')[0], { withFileTypes: true })

  const visibleFolders = files
  .filter(file => file.isDirectory() && !file.name.startsWith('.'))
  .map(file => file.name)

  const pkgName = pkg.name

  for (const dir of visibleFolders) {
    let potentialPath = path.join(__dirname.split('.yarn')[0], dir, pkgName.split('/').at(-1))
    
    if (_fileExists(potentialPath)) {
      return potentialPath
    }
  }
}


export { getPkgDir }
