const webpack = require('webpack');
const path = require('path');

const config = {
    context: path.join(__dirname, '/src'),
    entry: {
        background: './background.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: 'tsconfig.webpack.json'
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    output: {
        path: path.join(__dirname, '/public'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.ts']
    }
};

if (config.mode === 'production') {
    config.plugins = (config.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        })
    ]);
}

module.exports = config;
