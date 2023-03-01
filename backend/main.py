from flask import Flask, render_template, request
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

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

app.route("/message", methods = ['POST'])
def message():
    obj = request.form["message"]

if __name__ == "__main__":
    app.run(debug=True)