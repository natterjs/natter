# Utils for running Natter in Dev

#
# Starting with piped credentials
#

CREDENTIALS="${shell pwd}/config/credentials/natter-credentials.json"

init:
	sudo apt-get install sox
	yarn

start:
	GOOGLE_APPLICATION_CREDENTIALS=$(CREDENTIALS) yarn start

demo:
	GOOGLE_APPLICATION_CREDENTIALS=$(CREDENTIALS) yarn demo

run-test: ## Run all tests
	yarn test

build:
	yarn make
