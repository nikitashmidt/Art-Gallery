const path = require('path');
const SassResourcesLoader = require('craco-sass-resources-loader');
const CracoAlias = require('craco-alias');

module.exports = {
  webpack: {
    configure: (config, { env, paths }) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
      return config;
    }
  },
  plugins: [
    {
      plugin: SassResourcesLoader,
      options: {
        resources: [path.resolve(__dirname, './src/styles/index.scss')],
      },
    },
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: '.',
        tsConfigPath: './tsconfig.json',
      },
    },
  ]
};
