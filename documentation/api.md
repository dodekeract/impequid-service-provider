# API

- `GET /api/v1/basic/:appName` [example](https://services.impequid.com/api/v1/basic/dns.smartfl.at)
	- returns the app information for app `:appName`

- `GET /api/v1/multi/:appName,:appName,:appName,:appName` [example](https://services.impequid.com/api/v1/multi/dns.smartfl.at)
	- returns the information for all requested apps

- `GET /api/v1/all` [example](https://services.impequid.com/api/v1/all)
	- returns the information about all apps
	- useful mostly to initialize a local cache/mirror
