import DOM from './DOM';
import CSS from './CSS';
import FS from './FS';

const HTML_FILES_PATH = './dummy/*.html';
const CSS_FILES_PATH = './dummy/*.css';

const run = (html, styles) => {

  const document = new DOM(html);
  const stylesheet = new CSS(styles);

  
  stylesheet.process()
          .then(() => stylesheet.selectors.forEach(_ => {
              console.log(_)
          }))
}


const loadHtml = (path) => {
  return FS.readDirFiles(HTML_FILES_PATH)
          .then(paths => paths.map(p => FS.readFile(p)))
          .then(files => Promise.all(files))
}

const loadCss = (path) => {
  return FS.readDirFiles(path)
            .then(paths => paths.map(p => FS.readFile(p)))
            .then(files => Promise.all(files))
            .then(f => f.join(''));
}


Promise.all([loadHtml(HTML_FILES_PATH), loadCss(CSS_FILES_PATH)])
  .then(([htmls, styles]) => {
      htmls.forEach(_ => run(_, styles))
  })