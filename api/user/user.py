from flask import Flask, request, jsonify
from flask_cors import CORS
import hashlib
import user_controller

app = Flask(__name__)
CORS(app)

base_route = '/user'

@app.route("/")
def hello():
  return 'User connected'


@app.route(f"{base_route}/password", methods=['POST'])
def create_password():
  data = request.get_json()
  password = data['password']

  h = hashlib.new('sha256')
  h.update(password.encode('utf8'))

  return h.hexdigest()


@app.route(f"{base_route}/login", methods=['POST'])
def login():
  data = request.get_json()
  email = data['email']
  password = data['password']

  res = user_controller.get_user_by_email(email)

  h = hashlib.new('sha256')
  h.update(password.encode('utf8'))
  hashed = h.hexdigest()

  if "Item" in res and res["Item"]["password"] == hashed:
    return jsonify(
      {
        "code": 200,
        "data": {
          "user_address": res["Item"]["user_address"],
          "user_name": res["Item"]["user_name"],
        },
      } 
    ), 200
  else:
    return jsonify(
      {
        "code": 401,
        "message": "Incorrect username and/or password"
      }
    ), 401


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5001, debug=True)
