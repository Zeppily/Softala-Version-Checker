FROM ubuntu:rolling

COPY requirements.txt requirements.txt
RUN apt-get update && \
    apt-get install --no-install-recommends -y \
    python3 python3-pip python3-dev
RUN pip3 install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

ENV FLASK_APP=api.py
ENV FLASK_RUN_HOST=0.0.0.0
CMD python3 -m flask run

