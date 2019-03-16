all: build run

.PHONY: test run

build:
	docker build -t mesa-backend .

run:
	docker run -e TZ=America/Los_Angeles -t -i -p 5000:5000  -p 80:80 --rm mesa-backend

test:
	python3 ./test/request_server.py