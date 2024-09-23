module.exports = {
    devServer: {
        port: 3000,
    },
    webpack: {
        configure: {
            target: 'electron-renderer'
        },
        module: {
            rules: [
                {
                    test: /\.css$/i,
                    use: ["style-loader", "css-loader"],
                },
            ],
        }
    }
}