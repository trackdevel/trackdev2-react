const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
    // Where files should be sent once they are bundled
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'main.bundle.js',
        clean: true,
        publicPath: "/"
    },
    resolve: {
        alias: {
            Root: path.resolve(__dirname, 'src/')
        },
    },
    entry: {
        app: path.join(__dirname, './src/index.js')
        // app: path.join(__dirname, './src/test.js')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // new FaviconsWebpackPlugin('./src/favicon.jpg'),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /nodeModules/,
                use: ['babel-loader']
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(jpg|png|ico)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff)$/,
                type: 'asset/resource'
            }
        ]
    },
}
