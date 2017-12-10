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

  run(Store) {
    return this[this.style](Store);
  }
}