import json
import os
import amqp_setup
import pika
import json

def send_sms(message):
  amqp_setup.check_setup()

  print(message)

  amqp_setup.channel.basic_publish(
      exchange=amqp_setup.exchangename, 
      routing_key="order.sms", 
      body=message, 
      properties=pika.BasicProperties(delivery_mode = 2)
  )

  return
