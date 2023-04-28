import fs from 'fs'
import path from 'path'


export default async function (name, startDirPath, endPath='/') {
  if (!startDirPath || path.extname(startDirPath)) throw new Error(`Invalid startPath: ${startDirPath}`)
  
  let currPath = startDirPath

  let paths = []

  do {
      let files
      try {
        files = await fs.promises.readdir(currPath)
      } catch (err) {
        console.error('Error reading directory:', err);
        return;
      }

      if (files.includes(name)) paths.push( path.join(currPath, name) )

      if (currPath === endPath) break
      else currPath = path.join(currPath, '..') 
  } while (currPath !== '/')

  return paths
}