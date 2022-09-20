import boto3
import os

dynamodb = boto3.resource(
  'dynamodb', 
  region_name=os.environ.get('REGION'), 
  aws_access_key_id=os.environ.get('ACCESS_KEY'), 
  aws_secret_access_key=os.environ.get('SECRET_KEY'))

error_table = dynamodb.Table('error')

def get_all_errors():
  return error_table.scan()

def add_error(email, items_dict):
  date = datetime.now()

  res = error_table.put_item(
    Item = {
      'user_email': email,
      'order_date': str(date),
      'items': items_dict,
    }
  )
  return res
