import boto3
from boto3.dynamodb.conditions import Key
import os
from datetime import datetime

dynamodb = boto3.resource(
  'dynamodb', 
  region_name=os.environ.get('REGION'), 
  aws_access_key_id=os.environ.get('ACCESS_KEY'), 
  aws_secret_access_key=os.environ.get('SECRET_KEY'))

order_table = dynamodb.Table('order')

def get_all_orders():
  return order_table.scan()

def get_orders_by_email(email):
  res = order_table.query(
    KeyConditionExpression=Key('user_email').eq(email)
  )
  return res

def add_order(email, items_dict):
  date = datetime.now()

  res = order_table.put_item(
    Item = {
      'user_email': email,
      'order_date': str(date),
      'items': items_dict,
    }
  )
  return res
