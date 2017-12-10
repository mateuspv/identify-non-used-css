import DOM from './DOM';
import CSS from './CSS';
import Store from './Store';
import FileLoader from './FileLoader';

export default class IdentifyCSS {
  constructor(options) {
    this.options = options;
  }
  
  parse(document, stylesheet) {
    const SelectorsStore = new Store();
    const exists = stylesheet.selectors.filter(_ => document.exists(_));
    const notUsed = stylesheet.selectors.filter(_ => !document.exists(_));

    SelectorsStore.used(exists);
    SelectorsStore.notUsed(notUsed);
  }
  
  async run() {
    const FL = new FileLoader({
      html: this.options.htmls,
      css: this.options.styles
    });
    
    const [htmls, styles] = await FL.load();

    const stylesheet = await new CSS(styles).process();
    htmls.forEach(_ => this.parse(new DOM(_), stylesheet));
  }
}

new IdentifyCSS({
  htmls: './dummy/**.html',
  styles: './dummy/**.css'
}).run()