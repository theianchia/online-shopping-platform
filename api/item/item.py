from flask import Flask, request, jsonify
from flask_cors import CORS
import item_controller

app = Flask(__name__)
CORS(app)

base_route = '/item'

@app.route('/')
def hello():
    return "Item connected"


@app.route(f"{base_route}/all", methods=['POST'])
def get_all_items():
    data = request.get_json()

    # esk refers to {"item_name": ""}
    if 'esk' in data:
        esk = data['esk']
        print('hello')
        print(esk)
        res = item_controller.get_all_items(esk)["Items"]
    else:
        res = item_controller.get_all_items()["Items"]

    return res if res else "No items found/left"


@app.route(f"{base_route}", methods=['POST'])
def get_item():
    data = request.get_json()
    key = data['key']
    res = item_controller.get_item(key)
    return res if res else "No items found/left"


@app.route(f"{base_route}/number", methods=['GET'])
def get_num_items():
    res = item_controller.get_num_items()
    return str(res) if res else "0"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5003, debug=True)
