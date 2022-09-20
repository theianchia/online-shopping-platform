import boto3
import os

dynamodb = boto3.resource(
  'dynamodb', 
  region_name=os.environ.get('REGION'), 
  aws_access_key_id=os.environ.get('ACCESS_KEY'), 
  aws_secret_access_key=os.environ.get('SECRET_KEY'))

user_table = dynamodb.Table('user')

def get_all_users():
  return user_table.scan()

def get_user_by_email(email):
  res = user_table.get_item(
    Key = {
      'user_email': email
    },
    AttributesToGet=[
      'password',
      'user_name',
      'user_address',
    ]
  )
  return res
