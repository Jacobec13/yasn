const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    devServer: {
        proxy: {
            '/api': 'http://localhost:3000'
        }
    },
    entry: path.resolve(__dirname, './src/index.tsx'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true
                }
            }
        ]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            async: false
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './templates/index.html')
        })
    ]
}
