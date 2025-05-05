import fs from 'fs';

/**
 * Recursively deletes a file or directory.
 * 
 * @param {string} pathToDelete
 * @returns {Promise<string|null>} The deleted path, or null if it didn't exist.
 */
async function _deleteRecursive(pathToDelete) {
  try {
    await fs.promises.access(pathToDelete); // Check if path exists
  } catch (err) {
    if (err.code === 'ENOENT') return null;
    throw err;
  }

  try {
    const stats = await fs.promises.stat(pathToDelete);

    if (stats.isDirectory()) {
      await fs.promises.rm(pathToDelete, { recursive: true, force: true });
    } else {
      await fs.promises.unlink(pathToDelete);
    }

    return pathToDelete;
  } catch (err) {
    if (err.code === 'ENOENT') return null;
    throw err;
  }
}

/**
 * Deletes multiple files and directories.
 * 
 * @param {string[]} pathsToDelete - Array of paths to delete.
 * @returns {Promise<string[]>} Array of successfully deleted paths.
 */
export default async function deleteDirsAndFiles(pathsToDelete) {
  const results = await Promise.all(pathsToDelete.map(_deleteRecursive));
  return results.filter(Boolean); // Filter out nulls
}