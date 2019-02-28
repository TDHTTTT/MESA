FROM python:3.7
ADD . /backend
WORKDIR /backend
RUN pip install -r requirements.txt

CMD ["python", "main.py"]
EXPOSE 5000
