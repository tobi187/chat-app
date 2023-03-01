from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import json

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

app.app_context().push()


class Login(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(200), nullable=True)
    password = db.Column(db.String(1000), nullable=True)
    created_date = db.Column(db.DateTime(), default=datetime.utcnow)


class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(200), nullable=True)
    text = db.Column(db.String(1000), nullable=True)
    created_date = db.Column(db.DateTime(), default=datetime.utcnow)


@app.route("/Chat")
def start_page():
    return "<h1>Test</h1>"


@app.route("/message", methods=['POST'])
def message():
    obj = request.get_json()
    print(obj)
    with open("temp_store.json", "r", encoding="utf-8") as handler:
        data = json.load(handler)
    m: list[object] = data["messages"]
    m.append(obj)
    data["messages"] = m

    with open("temp_store.json", "w", encoding="utf-8") as handler:
        json.dump(data, handler, indent=4)

    print(data["messages"])

    return jsonify(data["messages"])


@app.route("/all")
def all_messages():
    with open("temp_store.json", "r", encoding="utf-8") as handler:
        data = json.load(handler)

    messages: list[object] = data["messages"]
    print(messages)
    return jsonify(messages)


if __name__ == "__main__":
    app.run(debug=True)
