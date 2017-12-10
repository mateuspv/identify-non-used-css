import DOM from './DOM';
import CSS from './CSS';
import FS from './FS';
import Store from './Store';


export default class IdentifyCSS {
  constructor(options) {
    this.options = options;
  }
  
  parse(html, stylesheet) {
    const document = new DOM(html);
    const S = new Store();
    
    stylesheet.selectors
        .filter(_ => document.exists(_))
        .forEach(_ => S.found(_))

    stylesheet.selectors
        .filter(_ => !document.exists(_))
        .forEach(_ => S.notFound(_))
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
                    return new CSS(styles)
                              .process()
                              .then((stylesheet) => [htmls, stylesheet])
                  })
                  .then(([htmls, stylesheet]) => {
                      htmls.forEach(_ => this.parse(_, stylesheet));
                  })
  }
}


new IdentifyCSS({
  HTML_FILES_PATH: './dummy/**.html',
  CSS_FILES_PATH: './dummy/**.css'
}).run()