FROM python:3-slim
WORKDIR /usr/src/app
COPY requirements.txt ./
RUN python -m pip install --no-cache-dir -r requirements.txt
COPY ./place_order.py ./invokes.py ./amqp_setup.py ./send_sms.py ./
CMD [ "python", "./place_order.py" ]