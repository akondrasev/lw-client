const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let buildFolder = "dist";

module.exports = {
    devtool: 'source-map',

    entry: {
        app: ['./src/app.js']
    },

    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js',
        path: path.resolve(__dirname, buildFolder)
    },

    module: {
        rules: [
            {test: /\.js$/, exclude: [/node_modules/], loaders: ['ng-annotate-loader', 'babel-loader']},
            {test: /\.html$/, loader: 'raw-loader'},
            {test: /\.(scss|sass)$/, loaders: ['style-loader', 'css-loader', 'sass-loader']},
            {test: /\.css$/, loaders: ['style-loader', 'css-loader']},
            {test: /\.less$/, loaders: ['style-loader', 'css-loader', 'less-loader']},
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
        new CleanWebpackPlugin([`${buildFolder}/*`]),

        new HtmlWebpackPlugin({
            template: './src/index.ejs',
            inject: 'body',
            hash: true,
            title: "Linnworks"
        }),

        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            mangle: {
                except: ['$', 'jQuery', 'angular']
            }
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                return module.resource
                    && (module.resource.indexOf(path.resolve(__dirname, 'src')) === -1);
            }
        }),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Popper: ['popper.js', 'default']
        })
    ]
};