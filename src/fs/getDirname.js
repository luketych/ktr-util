import { fileURLToPath } from 'url';
import { dirname } from 'path';


export default function getDirname(importMetaURL) {
    if (!importMetaURL) throw new Error('importMetaURL is required')

    const {_url} = importMetaURL

    const url = (_url) ? new URL(_url) : importMetaURL.url

    const currentFilePath = fileURLToPath(url)

    return dirname(currentFilePath)
}