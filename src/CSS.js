import postcss from 'postcss';

export default class CSS {
  constructor(css) {
    this.css = css;
  }

  /**
   * isValidQuery checks if a rule can be used as a query on DOM
   * @param  {String}  rule css rule
   * @return {Boolean}      [description]
   */
  isValidQuery(rule) {
    const pseudoElement = ':';
    return !rule.includes(pseudoElement);
  }

  /**
   * process current css
   * @return {Promise} this.
   * @chainable
   */
  process() {
    var allSelectorsFound = [];

    const plugin = postcss.plugin('postcss-selectors', (options = {}) => {
        return root => {
          root.walkRules(({selector}) => {
              allSelectorsFound.push(selector)
          });
        }
    });

    return postcss([plugin])
            .process(this.css)
            .then(_ => {
                this.selectors = allSelectorsFound.filter(_ => this.isValidQuery(_));
                return this;
            })
  }
}