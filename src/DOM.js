import {JSDOM} from 'jsdom';

export default class DOM {
  constuctor(html) {
    this.html = html;
  }

  parse(html) {
    this.dom = new JSDOM(this.html);
    return this;
  }

  query(q) {
    return this.dom.window.document.querySelectorAll(q);
  }
}
