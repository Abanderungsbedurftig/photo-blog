const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "server", "public"),
        filename: "bundle.js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ]
            }
        ]
    },
    plugins: [
        new UglifyJsPlugin({
            extractComments: true,
            uglifyOptions: {
                warnings: false,
            }
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions:{
                preset: ['default', {discardComments: {removeAll: true}}]
            },
            canPrint: true
        })
    ]
}