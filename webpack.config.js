const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const nodeExternals = require('webpack-node-externals')

const env = process.env.NODE_ENV || 'development'

const config = {
  devtool: env === 'development' ? 'source-map' : 'hidden-source-map',
  context: path.resolve('./src'),
  entry: {
    app: './index.ts',
    vendor: './vendor.ts'
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.map',
    devtoolModuleFilenameTemplate: (info) => `file:///${info.absoluteResourcePath}`
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts?$/,
        exclude: ['node_modules'],
        use: ['awesome-typescript-loader', 'source-map-loader']
      },
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        // eslint-disable-line quote-props
        NODE_ENV: JSON.stringify(env)
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Pyro.js Dashboard',
      template: '!!ejs-loader!src/index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
      sourceMap: true
    }),
    new DashboardPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: true,
          failOnHint: true
        }
      }
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist/'),
    compress: true,
    port: 3000,
    hot: true
  }
}

module.exports = config
