# Backend

## Running the backend server on your machine
Install all the necessary dependencies using:
`pip install -r requirements.txt`

and then you can run the app using:
`python3 main.py`

## Running the backend server using docker
In the docker file a simple setup is described to run the server. It will install all the dependencies in a container, meaning that if it runs on there it should also run on our machines (hopefully).

1. build the image: `docker build -t mesa-backend .`
2. Run the image (will automatically start the server): `docker run -i -p 5000:5000 --rm mesa-backend`