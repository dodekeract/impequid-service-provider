// region import

import http from 'http'
import route from 'spirit-router'
import spirit from 'spirit'

// internal

import config from './config'
import service from './service'

// endregion

// region alias

const {host, port} = config.listen

// endregion

// region routes

const app = route.define([
	route.get('/api/v1/basic/:domain', ['domain'], domain => {
		if (service.has(domain)) return {
			status: 200,
			body: JSON.stringify(
				service.get(domain),
				null,
				'\t'
			),
			headers: {}
		}
		return {
			status: 404,
			body: JSON.stringify(false, null, '\t'),
			headers: {}
		}
	}),

	route.get('/api/v1/multi/:domainList', ['domainList'], _list => {
		const list = _list.split(',')
		const result = {}

		domainList.forEach(domain => result[domain] = service.has(domain)
			? service.get(domain)
			: false
		)

		return {
			status: 200,
			body: JSON.stringify(result, null, '\t'),
			headers: {}
		}
	}),

	route.get('/api/v1/all', () => {
		const result = {};

		service.forEach((value, key) => result[key] = value)

		return {
			status: 200,
			body: JSON.stringify(result, null, '\t'),
			headers: {}
		}
	}),

	route.any('*', 'hello world')
]);

// endregion
// region start

http.createServer(spirit.node.adapter(app)).listen({host, port}, () => {
	console.info(`listening on http://${host}:${port}`)
})

// endregion
