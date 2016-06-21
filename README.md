# Impequid Service Provider

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](http://opensource.org/licenses/MIT)
[![Code Climate](https://codeclimate.com/github/dodekeract/impequid-service-provider/badges/gpa.svg)](https://codeclimate.com/github/dodekeract/impequid-service-provider)
[![NPM Downloads](https://img.shields.io/npm/dm/impequid-service-provider.svg)](https://npmjs.com/package/impequid-service-provider)
[![NPM Dependencies](https://david-dm.org/dodekeract/impequid-service-provider.svg)](https://npmjs.com/package/impequid-service-provider)
[![Gitter Chatroom](https://badges.gitter.im/dodekeract/impequid.svg)](https://gitter.im/dodekeract/impequid)

Implements an Impequid service provider, which stores information about Impequid Apps.

## Intended Purpose

Assuming you want to setup your own Impequid server, you most likely don't want to manage all information about Apps yourself. So you can just use any Impequid Service Provider, and let it manage the App information.

The default Impequid Service provider is available at `https://services.impequid.com`.

## Installation

- Install [Node.js](https://nodejs.org)
- Install [MongoDB](https://mongodb.org)
- `git clone https://github.com/dodekeract/impequid-service-provider`
- `cd impequid-service-provider`
- `npm install`
- `npm run build`

It is highly recommended to run Impequid Service Provider behind a reverse proxy, like Nginx.

## Usage

- Starting: `npm run start`
- Re-building (after changes): `npm run build`

## Configuration

Currently, you need to modify `config.json` in the `impequid-service-provider` directory:

````json
{
	"listen": {
		"address": "127.0.0.1",
		"port": 50001
	},
	"mongo": {
		"url": "mongodb://127.0.0.1/impequid-service-provider"
	},
	"server": {
		"name": "Server Name",
		"url": "server.url.com"
	}
}
````

## Exposed API

- `GET /api/v1/basic/:appName` [example](https://services.impequid.com/api/v1/basic/dns.smartfl.at)
	- returns the app information for app `:appName`

- `GET /api/v1/multi/:appName,:appName,:appName,:appName` [example](https://services.impequid.com/api/v1/multi/dns.smartfl.at)
	- returns the information for all requested apps

- `GET /api/v1/all` [example](https://services.impequid.com/api/v1/all)
	- returns the information about all apps
	- useful mostly to initialize a local cache/mirror
