// import external

import 'babel-polyfill'; // generator functions
import koa from 'koa';
import koaRouter from 'koa-router';
import http from 'http';
import {default as mongoose, Schema} from 'mongoose';

// config

let customConfig;

try {
	customConfig = require('../../config.json');
} catch (error) {
	customConfig = {};
}

const config = Object.assign({
	listen: {
		address: '127.0.0.1',
		port: 50001
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

// mongoose

mongoose.set('debug', config.mongo.debug);
mongoose.connect(config.mongo.url, error => {
	if (!error) {
		console.info('Connected to MongoDB');
	} else {
		console.error(`could not connect to mongo: ${error}`);
		process.exit(1);
	}
});

const schema = new Schema({
	name: {
		type: String,
		required: true
	},
	domain: {
		type: String,
		required: true,
		unique: true
	},
	url: {
		type: String,
		required: true
	},
	returnUrl: {
		type: String,
		required: true
	},
	denyUrl: {
		type: String,
		required: true
	},
	author: {
		pseudonym: {
			type: String,
			required: true
		},
		url: {
			type: String,
			required: true
		},
		name: {
			type: String
		}
	}
});

const Model = mongoose.model('service', schema);

// load service list into memory

const service = new Map();

Model.find({}, (error, entries) => {
	entries.forEach(({name, domain, url, returnUrl, denyUrl, author}) => {
		service.set(domain, {
			name,
			url,
			returnUrl,
			denyUrl,
			author
		});
	});
});

// routes

const apiRouter = koaRouter();

apiRouter.get('/basic/:domain', function * () {
	const {domain} = this.params;
	const result = service.get(domain);
	if (result) {
		this.body = result;
	} else {
		this.body = {
			error: 'Not found'
		};
		this.status = 404;
	}
});

apiRouter.get('/multi/:domainList', function * () {
	const domainList = this.params.domainList.split(',');
	const result = {};
	domainList.forEach(domain => {
		result[domain] = service.get(domain) || false;
	});
	this.body = result;
});

apiRouter.get('/all', function * () {
	const result = {};

	for (let [key, value] of service.entries()) {
		result[key] = value;
	}

	this.body = result;
});

// attach routes

const router = koaRouter();

router.use('/api/v1', apiRouter.routes(), apiRouter.allowedMethods());

// configure app

const app = koa();
app.use(router.routes());
app.use(router.allowedMethods());

// start server

const server = http.Server(app.callback());
server.listen(config.listen.port, config.listen.address);
server.on('listening', () => {
	console.log(`listening on http://${config.listen.address}:${config.listen.port}`);
});
