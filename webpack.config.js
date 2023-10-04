const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/bundled-scripts/index.js',
        home: './src/bundled-scripts/home.js',
      },
      devtool: 'inline-source-map',
      devServer: {
        port: 3030,
        static: './dist',
      },
      plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/HTML/index.html',
            chunks: ['index']
        }),
        new HtmlWebpackPlugin({
            filename: 'home.html',
            template: 'src/HTML/home.html',
            chunks: ['home']
        }),
      ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  module: {
    rules: [
        {
            test: /\.(js|jsx)$/, // .js and .jsx files
            exclude: /node_modules/, // excluding the node_modules folder
            use: {
              loader: "babel-loader",
            },
        },
        {
            test: /\.(sa|sc|c)ss$/, // styles files
            use: ["style-loader", "css-loader", "sass-loader"],
        },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.json$/,
        type: 'asset/resource',
        
      },
      {
        test: /\.(txt|csv|mmdb)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "[path][name].[ext]",
              emitFile: true,
            },
          },
        ],
      },
      {
        test: /\.xml$/i,
        use: ['xml-loader'],
      },
    ],
  },
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
        chunks: 'all',
      },
  },
};