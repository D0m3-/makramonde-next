const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');
const withStyles = require('@webdeb/next-styles');

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './src/makramonde.less'), 'utf8')
);

module.exports = withStyles({
  less: true,
  modules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]',
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables,
  },
  target: 'serverless',
});
