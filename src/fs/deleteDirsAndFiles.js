import fs from 'fs';
import path from 'path';

async function _deleteRecursive(pathToDelete) {
  try {
    await fs.promises.access(pathToDelete); // Ensure it exists
  } catch (err) {
    // If path doesn't exist, resolve with null
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

export default async function deleteDirsAndFiles(pathsToDelete) {
  const results = await Promise.all(
    pathsToDelete.map((p) => _deleteRecursive(p))
  );

  // Filter out any null results (i.e., non-existent paths)
  return results.filter(Boolean);
}