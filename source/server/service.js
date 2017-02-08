// region import

import {default as mongoose, Schema} from 'mongoose'

// internal

import config from './config'

// endregion

mongoose.set('debug', config.mongo.debug)
mongoose.connect(config.mongo.url, error => {
	if (!error) {
		console.info('connected to MongoDB')
	} else {
		console.error(`could not connect to mongo: ${error}`)
		process.exit(1)
	}
})

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
})

const Model = mongoose.model('service', schema)

// load service list into memory

const service = new Map()

Model.find({}, (error, entries) =>
	entries.forEach(({author, denyUrl, domain, name, returnUrl, url}) =>
		service.set(domain, {
			author,
			denyUrl,
			name,
			returnUrl,
			url
		})
	)
)

export default service
