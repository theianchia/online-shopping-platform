from twilio.rest import Client
import json
import os
from os.path import join, dirname
from dotenv import load_dotenv
import amqp_setup

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

monitorBindingKey='#'
account_sid = os.environ.get('TWILIO_ACCOUNT_SID')
auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
twilio_number = os.environ.get('TWILIO_PHONE_NUMBER')
client = Client(account_sid, auth_token)

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

  message = client.messages.create(
    body=message_body,
    from_=twilio_number,
    to=number
  )

  print(message.sid)

  return str(message)


if __name__ == "__main__":
  print("\nThis is " + os.path.basename(__file__), end='')
  print(": monitoring routing key '{}' in exchange '{}' ...".format(monitorBindingKey, amqp_setup.exchangename))
  receive_sms_data()
