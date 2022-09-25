import boto3
import os

dynamodb = boto3.resource(
  'dynamodb',
  region_name=os.environ.get('REGION'),
  aws_access_key_id=os.environ.get('ACCESS_KEY'),
  aws_secret_access_key=os.environ.get('SECRET_KEY'))

connection = boto3.client(
  'dynamodb',
  os.environ.get('REGION'),
  aws_access_key_id=os.environ.get('ACCESS_KEY'),
  aws_secret_access_key=os.environ.get('SECRET_KEY'))


item_table = dynamodb.Table('item')


def get_all_items(esk={}):
    if esk:
        return item_table.scan(Limit=2, ExclusiveStartKey=esk)
    return item_table.scan(Limit=2)


def get_item(key={}):
    return item_table.get_item(Key=key)


def get_num_items():
    return connection.describe_table(TableName='item')['Table']['ItemCount']
