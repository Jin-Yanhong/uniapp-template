module.exports = {
	devServer: {
		host: 'localhost',
		port: 8090,
		proxy: {
			'/api': {
				target: 'http://localhost:3000',
				changeOrigin: true,
				pathRewrite: {
					'^/api': 'api',
				},
			},
		},
	},
	chainWebpack: config => {
		// Config Less Loader
		config.module
			.rule('**/*.less')
			.test(/\.less$/i)
			.use('less-loader')
			.loader('less-loader')
			.end();
	},
};
