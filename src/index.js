import DOM from './DOM';
import CSS from './CSS';
import FS from './FS';

export default class IdentifyCSS {
  constructor(options) {
    this.options = options;
  }

  parse(html, styles) {
    const document = new DOM(html);
    const stylesheet = new CSS(styles);
  
    
    stylesheet.process()
            .then(() => stylesheet.selectors.forEach(_ => {
            }))
  }
  
  
  loadHtml(path) {
    return FS.readDirFiles(path)
            .then(paths => paths.map(p => FS.readFile(p)))
            .then(files => Promise.all(files))
  }
  
  loadCss(path) {
    return FS.readDirFiles(path)
              .then(paths => paths.map(p => FS.readFile(p)))
              .then(files => Promise.all(files))
              .then(f => f.join(''));
  }
  
  run() {
    const p1 = this.loadHtml(this.options.HTML_FILES_PATH);
    const p2 = this.loadCss(this.options.CSS_FILES_PATH);

    return Promise.all([p1, p2])
      .then(([htmls, styles]) => {
          htmls.forEach(_ => this.parse(_, styles))
      });
  }
}