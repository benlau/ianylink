.PHONY: build
build:
	rm -rf .parcel-cache
	npm run build

.PHONY: start
start:
	rm -rf .parcel-cache
	npm run start

.PHONY: test
test:
	npm run test

.PHONY: lint
lint:
	npm run lint

.PHONY: format
format:
	npm run lint:fix

.PHONY: clean
clean:
	rm -rf .parcel-cache
	rm -rf dist
