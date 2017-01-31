# API

## Basic

```http
GET /api/v1/basic/:appName
```

returns the app information for app `:appName`

[example](https://services.impequid.com/api/v1/basic/dns.smartfl.at)

## Multi

```http
GET /api/v1/multi/:appName,:appName,:appName,:appName
```

returns the information for all requested apps

[example](https://services.impequid.com/api/v1/multi/dns.smartfl.at)

## All

```http
GET /api/v1/all
```

returns the information about all apps

useful mostly to initialize a local cache/mirror

[example](https://services.impequid.com/api/v1/all)
