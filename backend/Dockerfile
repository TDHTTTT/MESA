FROM python:3.7 as dependencies
COPY ./requirements.txt /backend/requirements.txt
WORKDIR /backend
RUN pip install -r requirements.txt

FROM dependencies
ADD ./server/ /backend
ENTRYPOINT ["./server_setup_entrypoint"]

EXPOSE 5000
EXPOSE 80