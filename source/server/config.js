let customConfig;

try {
	customConfig = require('../../config.json');
} catch (error) {
	customConfig = {};
}

export default Object.assign({
	listen: {
		host: '127.0.0.1',
		port: 8080
	},
	mongo: {
		url: 'mongodb://127.0.0.1/impequid-service-provider',
		debug: true
	},
	server: {
		name: 'Server Name',
		url: 'server.url'
	}
}, customConfig);
