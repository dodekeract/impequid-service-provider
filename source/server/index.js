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
	route.get('/', {
		status: 308,
		body: JSON.stringify({
			redirect: 'https://github.com/impequid/service-provider'
		}, null, '\t'),
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
			Location: 'https://github.com/impequid/service-provider'
		}
	}),

	route.get('/api/v1/basic/:domain', ['domain'], domain => service.has(domain)
		? {
			status: 200,
			body: JSON.stringify(
				service.get(domain),
				null,
				'\t'
			),
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			}
		} : {
			status: 404,
			body: JSON.stringify(false, null, '\t'),
			headers: {}
		}
	),

	route.get('/api/v1/multi/:domainList', ['domainList'], list => ({
		status: 200,
		body: JSON.stringify(list
			.split(',')
			.map(domain => ({
				[domain]: service.get(domain) || false
			}))
			.reduce((a, b) => Object.assign(a, b), {}), null, '\t'),
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		}
	})),

	route.get('/api/v1/all', () => ({
		status: 200,
		body: JSON.stringify(
			[...service]
				.reduce((previous, [key, value]) => Object.assign(previous, {
					[key]: value
				}), {}),
			null,
			'\t'
		),
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		}
	})),

	route.any('*', {
		status: 404,
		body: JSON.stringify({
			error: 'Not Found'
		}, null, '\t'),
		headers: {
			'Content-Type': 'application/json; charset=utf-8'
		}
	})
]);

// endregion

// region start

http.createServer(spirit.node.adapter(app)).listen({host, port}, () =>
	console.info(`listening on http://${host}:${port}`)
)

// endregion
