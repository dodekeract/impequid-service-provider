# Docker Usage

Impequid Service Provider can easily be used with Docker. Here are some tips to get it up and running.

## Requirements

- docker
- MongoDB instance (recommended to be on the same host)

## Installation

Just clone this repo. Then run `docker build -t impequid/service-provider .` from the main folder.

## Running

`docker run -d -p 50001:8080 impequid/service-provider`
