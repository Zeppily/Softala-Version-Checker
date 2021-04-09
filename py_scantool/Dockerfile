# Base image
#FROM ubuntu:latest
FROM python:3.8-slim-buster
WORKDIR /py_app

# Installing python3 modules
COPY requirements.txt requirements.txt
RUN pip3 install --no-cache-dir -r requirements.txt

# Copying over all the python files in order to run
COPY . .

# Port number the container should expose (Flask Default Port: 5000)
EXPOSE 5000

# Running sh script
ENV FLASK_APP=api.py
ENV FLASK_RUN_HOST=0.0.0.0
CMD python3 -m flask run