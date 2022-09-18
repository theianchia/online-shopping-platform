from flask import Flask, request, jsonify
from flask_cors import CORS
import error_controller

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
  return 'Error connected'

@app.route('/get-error-logs')
def get_error_logs():
  return jsonify(error_controller.get_error_logs())

if __name__ == '__main__':
  app.run()
