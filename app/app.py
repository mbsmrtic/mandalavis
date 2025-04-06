from flask import Flask
from flask import render_template
from flask import url_for, send_from_directory
import os

app = Flask(__name__)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/')
def hello_world():
    return render_template('index.html')

@app.route('/pages/header.html')
def header():
    return render_template('header.html')

@app.route('/post/<int:post_id>')
def render_post(post_id):
    return render_template(f'post.html', post_id=post_id)

with app.test_request_context():
    print(url_for('hello_world'))
