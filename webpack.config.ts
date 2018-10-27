import * as webpack from 'webpack';
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

const config = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',

  context: __dirname,

  entry: { main: './src/index.tsx' },

  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.(ts(x)?$)/,
        exclude: /node_modules/,
        use: [
          { loader: 'cache-loader' },
          {
            loader: 'thread-loader',
            options: { workers: require('os').cpus().length - 1 },
          },
          {
            loader: 'ts-loader',
            options: { happyPackMode: true },
          },
        ],
      },
      {
        test: /\.(gif|jpg|png|svg|eot|otf|ttf|woff(2)?)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=100000&name=/[name].[ext]',
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      checkSyntacticErrors: true,
      tsconfig: './tsconfig.json',
      tslint: './tslint.json',
    }),
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    compress: true,
    contentBase: 'dist',
    historyApiFallback: true,
    hot: true,
    noInfo: true,
  },

  devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
};

export default config;
