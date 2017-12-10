import FS from 'fs';

export default class Output {
  constructor(style) {
    this.style = style;
  }

  log(Store) {
    console.log(Store.toString());
  }

  data(Store) {
    return Store;
  }

  file(Store) {
    FS.writeFileSync('./identify_css_log.txt', Store.toString());
  }

  async run(Store) {
    return await this[this.style](Store);
  }
}