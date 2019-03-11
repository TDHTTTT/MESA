FROM python:3.7
ADD . /backend
WORKDIR /backend
RUN pip install -r requirements.txt

ENTRYPOINT ["./server_setup_entrypoint"]

EXPOSE 5000
EXPOSE 80

