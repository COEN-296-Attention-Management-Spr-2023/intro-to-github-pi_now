from flask import Flask, jsonify
from flask_cors import CORS
from .Scrape import scrape

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    data = {"key": ["value", "value"]}
    return jsonify(data)

@app.route('/deez')
def deez():
    scrape()
    return "deez"

@app.route("/data") #localhost:5000/data
def data():
    info_json = {}
    for entry in scrape():
        entry = list(entry[0])
        product_type = entry[0]
        product_info = entry[1:]
        if product_type not in info_json:
            info_json[product_type] = {}
        
        info_json[product_type][product_info[0]] = product_info[1:]
    return jsonify(info_json)
