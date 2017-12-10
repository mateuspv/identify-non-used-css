const IdentifyCSS = require('../lib/index').default;

const Program = new IdentifyCSS({
  htmls: './dummy/**.html',
  styles: './dummy/**.css',
  output: 'file'
})

Program.run();