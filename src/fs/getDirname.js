import { fileURLToPath } from 'url';
import { dirname } from 'path';


export default function getDirname(importMetaURL) {
    if (!importMetaURL) throw new Error('importMetaURL is required')

    const currentFileUrl = importMetaURL

    const currentFilePath = fileURLToPath(currentFileUrl)

    return dirname(currentFilePath)
}