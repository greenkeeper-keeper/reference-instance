import {resolve} from 'path';
import webpack from 'webpack';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import CleanPlugin from 'clean-webpack-plugin';
import {getIfUtils, removeEmpty} from 'webpack-config-utils';

export default function (env) {
  const {ifDevelopment, ifProduction} = getIfUtils(env);
  const assetsPath = resolve(__dirname, './lib');

  return {
    target: 'node',
    entry: {
     index: './src/index.js'
    },
    output: {
      path: assetsPath,
      filename: '[name].js'
    },
    module: {
      rules: removeEmpty([
        {
          test: /\.js$/,
          include: /@travi|hapi-greenkeeper-keeper/,
          enforce: 'pre',
          loader: 'source-map-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            comments: false,
            cacheDirectory: true
          }
        }
      ])
    },
    plugins: removeEmpty([
      ifProduction(new CleanPlugin([assetsPath], {root: __dirname})),
      new webpack.DefinePlugin({
        'process.env': removeEmpty({
          NODE_ENV: JSON.stringify(env)
        })
      }),
      ifProduction(new webpack.optimize.ModuleConcatenationPlugin()),
      ifProduction(new LodashModuleReplacementPlugin()),
      ifDevelopment(new webpack.NamedModulesPlugin())
    ]),
    devtool: 'source-map'
  };
}
