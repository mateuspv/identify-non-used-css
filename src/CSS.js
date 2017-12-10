import postcss from 'postcss';

export default class CSS {
  constructor(css) {
    this.css = css;
  }

  process() {
    var allSelectorsFound = [];

    const plugin = postcss.plugin('postcss-selectors', (options = {}) => {
        return root => {
          root.walkRules(rule => allSelectorsFound.push(rule.selector));
        }
    });

    return postcss([plugin])
            .process(this.css)
            .then(_ => {
                this.selectors = allSelectorsFound;
                return this;
            })
  }
}