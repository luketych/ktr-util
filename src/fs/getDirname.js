import { fileURLToPath } from 'url';
import { dirname } from 'path';


export default function getDirname(importMetaURL) {
    if (!importMetaURL) throw new Error('importMetaURL is required')

    const {url} = importMetaURL

    const currentFilePath = fileURLToPath(url)

    return dirname(currentFilePath)
}