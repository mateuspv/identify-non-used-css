import glob from 'glob';
import {promisify}  from 'util';
import fs from 'fs';

export default {
  readDirFiles(path) {
    const read = promisify(glob);
    return read(path);
  },

  readFile(path) {
    return promisify(fs.readFile)(path, {encoding: 'utf8'});
  }
}