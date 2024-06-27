const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    entry: './src/main.tsx',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.svg'],
        alias: {
            '@src': path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'src/app/components'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@utils': path.resolve(__dirname, 'src/utils')
        }
    },
    module: {
        rules: [
            // {
            //     test: /\.css$/i,
            //     include: [
            //         path.resolve(__dirname, 'src')
            //     ],
            //     use: [
            //         'style-loader',
            //         {
            //             loader: MiniCssExtractPlugin.loader,
            //             options: {
            //                 esModule: false
            //             }
            //         },
            //         'css-loader',
            //         'postcss-loader',
            //     ],
            // },
            // {
            //     test: /\.module\.css$/,
            //     use: [
            //         'style-loader',
            //         {
            //             loader: 'css-loader',
            //             options: {
            //                 modules: true
            //             }
            //         },
            //         'postcss-loader'
            //     ]
            // },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(svg)$/i,
                type: 'asset/inline',
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(js|ts)x?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader"
                }
            },
        ],
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'build'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new ForkTsCheckerWebpackPlugin({
            typescript: {
                configFile: path.resolve(__dirname, 'tsconfig.json')
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
    ]
};