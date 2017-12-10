import {JSDOM} from 'jsdom';

export default class DOM {
  constructor(html) {
    this.html = html;
  }

  parse(html) {
    this.dom = new JSDOM(this.html);
  }

  query(q) {
    if(!this.dom) {
      this.parse();
    }

    return this.dom.window.document.querySelector(q);
  }

  exists(q) {
    return this.query(q) ? true : false;
  }
}
