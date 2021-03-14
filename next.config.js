const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');
const withPlugins = require('next-compose-plugins');
const withStyles = require('@webdeb/next-styles');
const withPWA = require('next-pwa');
const { THEME_VARIABLES } = require('./src/util/configConstants');

const antVariables = lessToJS(
  fs.readFileSync(
    path.resolve(
      __dirname,
      './node_modules/antd/lib/style/themes/default.less'
    ),
    'utf8'
  )
);
const modifyVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './src/makramonde.less'), 'utf8')
);
const themeVariables = { ...antVariables, ...modifyVariables };

module.exports = withPlugins(
  [
    [
      withStyles,
      {
        less: true,
        modules: true,
        cssLoaderOptions: {
          importLoaders: 1,
          localIdentName: '[local]___[hash:base64:5]',
        },
        lessLoaderOptions: {
          javascriptEnabled: true,
          modifyVars: modifyVariables,
        },
      },
    ],
    [
      withPWA,
      {
        pwa: {
          disable: process.env.NODE_ENV === 'development',
          dest: 'public',
        },
      },
    ],
  ],
  {
    target: 'serverless',
    env: {
      URL: process.env.URL,
      GOOGLE_ANALYTICS_ID: process.env.GOOGLE_ANALYTICS_ID,
      THEME_VARIABLES: Object.values(THEME_VARIABLES).reduce(
        (variables, value) => {
          variables[value] = themeVariables[value];
          return variables;
        },
        {}
      ),
    },
    images: {
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    },
    async rewrites() {
      return [
        {
          source: '/sitemap.xml',
          destination: '/api/sitemap',
        },
        {
          source: '/robots.txt',
          destination: '/api/robots',
        },
      ];
    },
  }
);
