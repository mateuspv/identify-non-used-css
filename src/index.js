import DOM from './DOM';
import CSS from './CSS';
import Store from './Store';
import FileLoader from './FileLoader';

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
  
  await run() {
    const FL = new FileLoader({
      html: this.options.htmls,
      css: this.options.styles
    });
    
    return FL.load()
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
  htmls: './dummy/**.html',
  styles: './dummy/**.css'
}).run()