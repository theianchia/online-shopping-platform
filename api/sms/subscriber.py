from twilio import twiml
import json
import os
import amqp_setup

def receive_sms_data():
  amqp_setup.check_setup()

  queue_name = 'order'

  amqp_setup.channel.basic_consume(queue=queue_name, on_message_callback=callback, auto_ack=True)
  amqp_setup.channel.start_consuming()

def callback(channel, method, properties, body):
  print("\nReceived sms data " + __file__)
  process_sms(json.loads(body))
  print()

def process_sms(sms_data):
  print("Sending out an sms:")
  print(sms_data)
  number = sms_data['to']
  message_body = sms_data['body']
  res = twiml.Response()
  res.message('Hello {}, you said: {}'.format(number, message_body))
  return str(resp)


if __name__ == "__main__":
  print("\nThis is " + os.path.basename(__file__), end='')
  print(": monitoring routing key '{}' in exchange '{}' ...".format(amqp_setup.exchangename))
  receive_sms_data()