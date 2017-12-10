import DOM from './DOM';
import CSS from './CSS';
import Store from './Store';
import FileLoader from './FileLoader';
import Output from './Output';

export default class IdentifyCSS {
  constructor(options) {
    this.settings = this.getSettings(options);
  }
  
  getSettings(settings) {
    const defaultSettings = {
      output: 'data'
    };

    return Object.assign(defaultSettings, settings);
  }

  parse(document, stylesheet) {
    const exists = stylesheet.selectors.filter(_ => document.exists(_));
    const notUsed = stylesheet.selectors.filter(_ => !document.exists(_));

    return new Store(exists, notUsed);;
  }
  
  async run() {
    const FL = new FileLoader({
      html: this.settings.htmls,
      css: this.settings.styles
    });
    
    const [htmls, styles] = await FL.load();

    const stylesheet = await new CSS(styles).process();
    const result = htmls.map(_ => this.parse(new DOM(_), stylesheet));
    const Out = new Output(this.settings.output);

    await Out.run(result);

    return result;
  }
}

