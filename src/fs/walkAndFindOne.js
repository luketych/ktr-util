import fs from 'fs'
import path from 'path'


export default async function (name, startDirPath, endPath='/') {
  if (!startDirPath || path.extname(startDirPath)) throw new Error(`Invalid startPath: ${startDirPath}`)
  
  let currPath = path.resolve(startDirPath)

  do {

      let files
      try {
        files = await fs.promises.readdir(currPath)
      } catch (err) {
        console.error('Error reading directory:', err);
        return;
      }

      if (files.includes(name)) return path.resolve(currPath, name)

      else currPath = path.resolve(currPath, '..')
    
  } while (currPath !== endPath)
}