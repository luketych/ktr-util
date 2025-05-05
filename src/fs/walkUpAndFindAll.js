import fs from 'fs';
import path from 'path';

/**
 * Walk up the directory tree from `startDirPath` to `endPath`,
 * collecting all paths where a file or folder named `targetName` exists.
 *
 * @param {string} targetName - The name of the file or folder to search for.
 * @param {string} startDirPath - The directory to start walking from.
 * @param {string} [endPath='/'] - The directory to stop at (inclusive).
 * @returns {Promise<string[]>} Array of full paths where the file/folder is found.
 */
export default async function walkUpAndFindAll(targetName, startDirPath, endPath = '/') {
  if (!startDirPath || path.extname(startDirPath)) {
    throw new Error(`Invalid start path: ${startDirPath}`);
  }

  const foundPaths = [];
  let currDir = startDirPath;

  while (true) {
    try {
      const files = await fs.promises.readdir(currDir);
      if (files.includes(targetName)) {
        foundPaths.push(path.join(currDir, targetName));
      }
    } catch (err) {
      console.warn(`Unable to read directory ${currDir}: ${err.message}`);
    }

    if (currDir === endPath || currDir === path.dirname(currDir)) break;
    currDir = path.dirname(currDir);
  }

  return foundPaths;
}