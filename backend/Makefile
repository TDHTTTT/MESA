all: build run

build:
	docker build -t mesa-backend .

run:
	docker run -t -i -p 5000:5000 --rm mesa-backend

test:
	python3 request_server.py