const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

//TODO make production - friendly configuration to allow switch build types (ex. if production = true -> minimize code and configure angular to drop debug nodes from DOM)
module.exports = {
    devtool: 'source-map',

    entry: {
        app: ['./src/app.js']
    },

    output: {
        filename: '[name].bundle.js',
        publicPath: '/docs',
        path: path.resolve(__dirname, 'docs')
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
        new CleanWebpackPlugin(['docs']),

        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body',
            hash: true
        }),

        new webpack.HotModuleReplacementPlugin(),

        // new webpack.optimize.UglifyJsPlugin({
        //     mangle: {
        //         except: ['$', 'jQuery', 'angular']
        //     }
        // }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
                return module.resource && module.resource.indexOf(path.resolve(__dirname, 'src')) === -1;
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