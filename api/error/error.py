from flask import Flask, request, jsonify
from flask_cors import CORS
import error_controller

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
  return 'Error connected'

@app.route('/get-all-errors')
def get_all_errors():
  res = error_controller.get_all_errors()["Items"]
  return res

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=5004, debug=True)
