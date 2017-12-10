import glob from 'glob';
import {promisify}  from 'util';
import fs from 'fs';

export default class FileLoader {
  constructor(settings) {
    this.settings = settings;
  }

  readDirFiles(path) {
    const read = promisify(glob);
    return read(path);
  }

  readFile(path) {
    return promisify(fs.readFile)(path, {encoding: 'utf8'});
  }

  loadHtml() {
    return this.readDirFiles(this.settings.html)
    .then(paths => paths.map(p => this.readFile(p)))
    .then(files => Promise.all(files))
  }
  
  loadCss() {
    return this.readDirFiles(this.settings.css)
    .then(paths => paths.map(p => this.readFile(p)))
    .then(files => Promise.all(files))
    .then(f => f.join(''));
  }

  load() {
    return Promise.all([
      this.loadHtml(),
      this.loadCss()
    ])
  }
}