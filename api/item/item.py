from flask import Flask, request, jsonify
from flask_cors import CORS
import item_controller

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
  return "Item connected"


@app.route('/get-all-items', methods=['POST'])
def get_all_items():
  data = request.get_json()
  
  # esk refers to {"item_name": ""}
  if 'esk' in data:
    esk = data['esk']
    res = item_controller.get_all_items(esk)["Items"]
  else:
    res = item_controller.get_all_items(esk)["Items"]

  return res if res else "No items found/left"


if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5003, debug=True)
