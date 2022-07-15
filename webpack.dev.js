const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path')

module.exports = merge(common, {
        // webpack 5 comes with devServer which loads in development mode
        devServer: {
            port: 3000,
            watchFiles: ['src/*'],
            historyApiFallback: true
        },
        mode: 'development',
        resolve: {
            alias: {
                Root: path.resolve(__dirname, 'src/')
            },
        },
        devtool: 'inline-source-map'
    }
)
