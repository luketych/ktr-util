import fs from 'fs';
import path from 'path';

/**
 * Walk up the directory tree from `startDirPath` to `endPath`,
 * collecting all paths where a file or folder named `targetName` exists.
 *
 * @param {string} targetName - The name of the file or folder to search for (can include path separators).
 * @param {string} startDirPath - The directory to start walking from.
 * @param {string} [endPath='/'] - The directory to stop at (inclusive).
 * @returns {Promise<string[]>} Array of full paths where the file/folder is found.
 */
export default async function walkUpAndFindAll(targetName, startDirPath, endPath = '/') {
  if (!startDirPath || path.extname(startDirPath)) {
    throw new Error(`Invalid start path: ${startDirPath}`);
  }

  const foundPaths = [];
  // Resolve to ensure consistent path format
  let currDir = path.resolve(startDirPath);
  const resolvedEndPath = path.resolve(endPath);

  while (true) {
    const potentialPath = path.join(currDir, targetName);
    try {
      // Check if the constructed path exists
      await fs.promises.access(potentialPath, fs.constants.F_OK);
      // If access doesn't throw, the path exists
      foundPaths.push(potentialPath);
    } catch (err) {
      // access throws an error if path doesn't exist, which is expected. 
      // We only care about other potential errors during the loop.
      if (err.code !== 'ENOENT') {
          console.warn(`Error checking path ${potentialPath}: ${err.message}`);
      }
    }

    // Stop condition: reached endPath or the root directory
    if (currDir === resolvedEndPath || currDir === path.dirname(currDir)) {
        break;
    }
    
    currDir = path.dirname(currDir); // Move up one directory
  }

  return foundPaths;
}