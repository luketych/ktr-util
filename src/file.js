import { fileURLToPath } from 'url';
import { dirname } from 'path';


function getDirname(importMetaURL) {
    if (!importMetaURL) throw new Error('importMetaURL is required')

    const currentFileUrl = importMetaURL

    const currentFilePath = fileURLToPath(currentFileUrl)

    return dirname(currentFilePath)
}


function getFilename(importMetaURL) {
    if (!importMetaURL) throw new Error('importMetaURL is required')

    const currentFileUrl = importMetaURL

    const currentFilePath = fileURLToPath(currentFileUrl)
  
    return currentFilePath.split('/').pop()
}


function getFilenameWithoutExt(importMetaURL) {
    if (!importMetaURL) throw new Error('importMetaURL is required')

    const currentFileUrl = importMetaURL

    const currentFilePath = fileURLToPath(currentFileUrl)

    return currentFilePath.split('/').pop().split('.').shift()

}


export { getDirname, getFilename, getFilenameWithoutExt }