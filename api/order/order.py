from flask import Flask, request, jsonify
from flask_cors import CORS
import order_controller

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
  return 'Order connected'

@app.route('/get-order-logs')
def get_order_logs():
  return jsonify(order_controller.get_order_logs())

if __name__ == '__main__':
  app.run()
