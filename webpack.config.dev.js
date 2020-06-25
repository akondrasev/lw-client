const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // devtool: 'source-map',

    entry: {
        app: ['./src/app.js']
    },

    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
        publicPath: '/',
        path: path.resolve(__dirname, 'docs')
    },

    module: {
        rules: [
            {test: /\.js$/, exclude: [/node_modules/], use: ['babel-loader']},
            {test: /\.html$/, loader: 'raw-loader'},
            {test: /\.(scss|sass)$/, use: ['style-loader', 'css-loader', 'sass-loader']},
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|otf)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.ejs',
            inject: 'body',
            hash: true,
            title: "Fake Linnworks"
        }),

        new webpack.HotModuleReplacementPlugin(),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Popper: ['popper.js', 'default']
        })
    ]
};
