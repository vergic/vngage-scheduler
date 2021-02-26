const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'vngage-scheduler.min.js',
    library: 'vngage-scheduler',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true,
  },
  target: ['web', 'es5'],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {}
          }
        ],
        exclude: /node_modules/
      }
    ]
  }
};