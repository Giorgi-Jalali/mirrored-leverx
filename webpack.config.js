const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  devServer: {
    static: './dist',
    port: 3001,
    open: true,
  },
};



// const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

// module.exports = {
//     mode: "development",
//     // mode: "production",
//     entry: "./src/index.tsx",
//     output: {
//         filename: "bundle.js",
//         path: path.resolve(__dirname, "dist"),
//         clean: true,
//     },
//     resolve: {
//         extensions: [".js", ".ts", ".tsx"],
//     },
//     module: {
//         rules: [
//             {
//                 test: /\.tsx?$/,
//                 use: "ts-loader",
//                 exclude: /node_modules/,
//             },
//             {
//                 test: /\.scss$/,
//                 use: ["style-loader", "css-loader", "sass-loader"],
//             },
//         ],
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: "./src/index.html",
//         }),
//     ],
//     devServer: {
//         static: "./dist",
//         port: 3001,
//         open: true,
//     },
// };
