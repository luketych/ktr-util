import fs from 'fs'


async function _deleteRecursive(pathToDelete) {
  try {
    // Check if path exists
    await fs.promises.access(pathToDelete);
  } catch (err) {
    throw err
  }

  try {
    // Get stats for the path
    const stats = await fs.promises.stat(pathToDelete);

    if (stats.isDirectory()) {
      // Delete directory recursively
      await fs.promises.rm(pathToDelete, { recursive: true });
      return pathToDelete;
    } else {
      // Delete file
      await fs.promises.unlink(pathToDelete);
      return pathToDelete;
    }
  } catch (err) {
    if (err.code === 'ENOENT') return
    else throw err
  }
}


/**
 * Deletes multiple directories and files.
 * 
 * @param {string[]} pathsToDelete - Array of paths to delete. Can be files or directories.
 * @returns {Promise<string[]>} Array of successfully deleted paths. If a path doesn't exist,
 *                             it won't be included in the returned array.
 *                             If pathsToDelete is empty, it will return an empty array.
 * @throws {Error} If there's an error other than ENOENT (file/directory not found)
 */
export default async function deleteDirsAndFiles(pathsToDelete) {
  const deletedPaths = [];

  return Promise.all(pathsToDelete.map(pathToDelete => _deleteRecursive(pathToDelete)))
  .then(results => {
      // Flatten the array of deleted paths
      results. forEach(path => {
        if (path) deletedPaths.push(path); // if path is null, it means it was not deleted. Don't add it to the array
      });

      return deletedPaths;
  })
  .catch(err => {
      if (errcode === 'ENOENT') return []
      else throw err
  });
}