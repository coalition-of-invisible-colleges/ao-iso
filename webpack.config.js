const path = require('path');
const webpack = require('webpack');
const cssnano = require('cssnano');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const dotenv = require('dotenv');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

// bake .env into the client code
const configEnv = dotenv.config({ debug: true }).parsed;
const envKeys = Object.keys(configEnv).reduce((result, key) => {
  result[`process.env.${key}`] = JSON.stringify(configEnv[key]);
  return result;
}, {});

const isEnvDevelopment = process.env.NODE_ENV !== 'production';

const srcPath = path.resolve(process.cwd(), './src');
const buildPath = path.resolve(process.cwd(), './server');
const templatePath = path.resolve(process.cwd(), './public/template.html');
const htmlPath = path.resolve(buildPath, './template.html');

const extractStyle = new MiniCssExtractPlugin({
  filename: 'css/[name].css',
  chunkFilename: 'css/[name].css',
});

// used for those files which can't be loaded by url-loader
const copyAssets = new CopyWebpackPlugin({
  patterns: [
    // Copy directory contents to {output}/to/directory/
    {
      // from: 'assets', to: 'assets', // if the context directory has assets
      from: './src/assets',
      to: 'assets',
    },
  ]
});

const cssLoaders = [
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: () =>
        isEnvDevelopment
          ? [autoprefixer]
          : [autoprefixer, cssnano({ discardComments: { removeAll: true, filterPlugins: false } })],
    },
  },
  { 
    loader: 'sass-loader',
    options: {
      sourceMap: isEnvDevelopment
    }
  }
];

module.exports = [
  {
    name: 'server',
    entry: {
      routes: './src/server/routes',
      app: isEnvDevelopment ? './src/server/index' : './src/server/index.prod',
    },
    output: {
      path: buildPath,
      filename: '[name].js',
      publicPath: '/',
      libraryTarget: 'commonjs2'
    },
    target: 'node',
    node: {
      // Need this when working with express, otherwise the build fails
      __dirname: false,   // if you don't put this is, __dirname
      __filename: false,  // and __filename return blank or /
    },
    devtool: 'source-map',
    externals: [nodeExternals()],
    optimization: {
      minimize: !isEnvDevelopment,
      sideEffects: false
    },
    mode: isEnvDevelopment ? "development" : "production",
    context: process.cwd(),
    resolve: {
      modules: [srcPath, 'node_modules'],
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss'],
      alias: { 'react-dom': '@hot-loader/react-dom' },
    },
    plugins: [
      copyAssets,
      extractStyle,
      new webpack.NamedModulesPlugin(),
      new webpack.DefinePlugin(envKeys),
      new webpack.DefinePlugin({
        __SERVER__: true,
        __CLIENT__: false,
      })
    ].concat(
      isEnvDevelopment
        ? [new webpack.HotModuleReplacementPlugin()]
        : [
            new HtmlWebpackPlugin({
              template: templatePath,
              minify: false,
              filename: htmlPath,
            }),
          ],
    ),
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: [/node_modules/],
          use: [
            { 
              loader: 'babel-loader', 
            },
            {
              loader: path.resolve('./tools/importer-loader.js'),
              options: {
                functionName: 'importer',
              },
            },
          ],
        },
        {
          test: /\.((c|s[ac])ss)$/,
          use: ['isomorphic-style-loader', MiniCssExtractPlugin.loader, ...cssLoaders],
        },
        {
          test: /\.(eot|woff|woff2|ttf)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[name].[ext]',
                publicPath: '/',
                outputPath: 'assets/',
                limit: 10 * 1000, //10 kb
                fallback: 'file-loader',
              },
            },
          ],
        },
        {
          test: /\.(svg|png|jpg|jpeg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                publicPath: '/assets/',
                outputPath: 'assets/',
              },
            },
          ],
        }
      ]
    }
  },
  {
    name: 'client',
    entry: {
      app: isEnvDevelopment ? ['./index.tsx', 'webpack-hot-middleware/client'] : './index.tsx'
    },
    output: {
      path: buildPath,
      filename: isEnvDevelopment ? 'js/[name].js' : 'js/[name].[hash].js',
      publicPath: '/'
    },
    target: 'web',
    optimization: {
      minimize: !isEnvDevelopment,
      sideEffects: false,
      splitChunks: {
        cacheGroups: {
          commons: {
            name: 'commons',
            chunks: 'all',
            minChunks: 2,
          },
          vendor: isEnvDevelopment
            ? {
                test: /node_modules/,
                name: 'vendor',
                chunks: 'all',
                enforce: true,
              }
            : {
                test: /node_modules/,
                name: 'vendor',
                chunks: 'all',
                enforce: true,
                minSize: 75 * 1000, // 75 kb
                maxSize: 200 * 1000, // 200 kb
              },
        },
      },
    },
    mode: isEnvDevelopment ? "development" : "production",
    context: srcPath,
    resolve: {
      modules: [srcPath, 'node_modules'],
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss'],
      alias: { 'react-dom': '@hot-loader/react-dom' },
    },
    plugins: [
      extractStyle,
      new webpack.NamedModulesPlugin(),
      new webpack.DefinePlugin(envKeys),
      new webpack.DefinePlugin({
        __SERVER__: false,
        __CLIENT__: true,
      })
    ].concat(
      isEnvDevelopment
        ? [new webpack.HotModuleReplacementPlugin()]
        : [
            new HtmlWebpackPlugin({
              template: templatePath,
              minify: false,
              filename: htmlPath,
            }),
          ],
    ),
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: [/node_modules/],
          use: [
            { 
              loader: 'babel-loader', 
            },
            {
              loader: path.resolve('./tools/importer-loader.js'),
              options: {
                functionName: 'importer',
              },
            },
          ],
        },
        {
          test: /\.((c|s[ac])ss)$/,
          use: ['isomorphic-style-loader', MiniCssExtractPlugin.loader, ...cssLoaders],
        },
        {
          test: /\.(eot|woff|woff2|ttf)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[name].[ext]',
                publicPath: '/',
                outputPath: 'assets/',
                limit: 10 * 1000, //10 kb
                fallback: 'file-loader',
              },
            },
          ],
        },
        {
          test: /\.(svg|png|jpg|jpeg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                publicPath: '/assets/',
                outputPath: 'assets/',
              },
            },
          ],
        }
      ]
    }
  }
];
