import json
import os
import amqp_setup
import pika
import json

def send_sms(message):
  amqp_setup.check_setup()
  sms_message = json.dumps(message)

  print(sms_message)

  amqp_setup.channel.basic_publish(
      exchange=amqp_setup.exchangename, 
      routing_key="order.sms", 
      body=sms_message, 
      properties=pika.BasicProperties(delivery_mode = 2)
  )

  return
