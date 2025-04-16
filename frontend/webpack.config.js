const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
	entry: './src/index.jsx',
	output: {
		path: path.resolve(__dirname, 'public'),
		filename: 'app.js',
		clean: true,
	},
	devServer: {
		port: 8000,
		static: {
			directory: path.resolve(__dirname, 'public'),
		},
		hot: true,
		historyApiFallback: true,
	},
	resolve: {
		extensions: ['.js', '.jsx'],
		alias: {
			modules: path.resolve(__dirname, 'node_modules'),
			jquery: 'modules/admin-lte/plugins/jQuery/jquery-2.2.3.min.js',
			bootstrap: 'modules/admin-lte/bootstrap/js/bootstrap.min.js',
		},
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery',
		}),
		new MiniCssExtractPlugin({
			filename: 'app.css',
		}),
	],
	module: {
		rules: [
			{
				test: /\.jsx?$/, // Processa arquivos .js e .jsx
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env', { useBuiltIns: 'entry', corejs: 3 }],
							'@babel/preset-react', // Garante suporte a JSX
						],
						plugins: ['@babel/plugin-transform-object-rest-spread'],
					},
				},
			},
			{
				test: /\.scss$/, // Processa apenas arquivos SCSS
				exclude: /node_modules/, // Exclui bibliotecas externas
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							implementation: require('sass'),
						},
					},
				],
			},
			{
				test: /\.css$/, // Processa arquivos CSS
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.(woff2?|ttf|eot|svg|png|jpe?g|gif)$/, // Processa arquivos de fontes e imagens
				type: 'asset/resource',
				generator: {
					filename: 'assets/[name][hash][ext]',
				},
			},
		],
	},
	optimization: {
		minimize: process.env.NODE_ENV === 'production',
		minimizer: ['...', new (require('css-minimizer-webpack-plugin'))()],
	},
};
