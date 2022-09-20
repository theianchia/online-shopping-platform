from flask import Flask, request, jsonify
from flask_cors import CORS
import item_controller

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
  return "Item connected"


@app.route('/get-items')
def get_items():
  return jsonify(item_controller.get_items())


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5003, debug=True)