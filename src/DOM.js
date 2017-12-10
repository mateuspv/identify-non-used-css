import {JSDOM} from 'jsdom';

export default class DOM {
  constuctor(html) {
    this.html = html;
    this.isParsed = false;
  }

  parse(html) {
    this.dom = new JSDOM(this.html);
    this.isParsed = true;
  }

  query(q) {
    if(!this.isParsed) {
      this.parse();
    }

    return this.dom.window.document.querySelectorAll(q);
  }
}
