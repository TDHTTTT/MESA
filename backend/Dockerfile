FROM python:3.7 as dependencies
COPY ./requirements.txt /backend/requirements.txt
WORKDIR /backend
RUN pip install -r requirements.txt

ENV TZ=America/Los_Angeles
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

FROM dependencies
ADD ./server/ /backend
ENTRYPOINT ["./server_setup_entrypoint"]

EXPOSE 5000
EXPOSE 80