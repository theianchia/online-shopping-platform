from flask import Flask, request, jsonify
from flask_cors import CORS
import os, sys
import requests
from invokes import invoke_http
import json
from send_sms import send_sms

app = Flask(__name__)
CORS(app)

order_URL = os.environ.get('ORDER_URL')
error_URL = os.environ.get('ERROR_URL')

@app.route("/")
def hello():
  return 'Place Order connected'


@app.route("/place-order", methods=['POST'])
def place_order():
  data = request.get_json()

  res = invoke_http(
    order_URL + '/add-order',
    method='POST',
    json=data,
  )

  if res["code"] in range(200, 300):
    message = f"Hi {data['user_name']}, your order was successfully placed!"
    data = {
      'body': message,
      'to': data['phone_number']
    }

    sms_data = json.dumps(data)
    msg_status = send_sms(sms_data)

  return jsonify(res), res["code"]


if __name__ == "__main__":
  app.run(host="0.0.0.0", port=5100, debug=True)
