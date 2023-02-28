module.exports = {
	chainWebpack: config => {
		// Config Less Loader
		config.module
			.rule("**/*.less")
			.test(/\.less$/i)
			.use("less-loader")
			.loader("less-loader")
			.end();
	},
};
