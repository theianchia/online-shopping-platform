import boto3
import os

dynamodb = boto3.resource(
  'dynamodb', 
  region_name=os.environ.get('REGION'), 
  aws_access_key_id=os.environ.get('ACCESS_KEY'), 
  aws_secret_access_key=os.environ.get('SECRET_KEY'))

item_table = dynamodb.Table('item')

def get_all_items(esk={}):
  if esk:
    return item_table.scan(Limit=1, ExclusiveStartKey=esk)
  return item_table.scan(Limit=1)
