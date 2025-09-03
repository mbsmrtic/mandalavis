from flask import Flask
from flask import render_template, request, redirect
from flask import url_for, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func

from jinja2 import TemplateNotFound 
import os
from app.src.mandalas.postfactory import mandala_post_factory, sidebar_data, mandala_posts
from app.src.mandalas.postroute import get_url_for_post

# This runs all imports in models/__init__.py
#  only these models will be included in the create_all and drop_all below
from app.models.db import db

app = Flask(__name__)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/')
def index():
    template_data = {}
    template_data[18] = mandala_post_factory(18)
    template_data[17] = mandala_post_factory(17)
    template_data[16] = mandala_post_factory(16)
    template_data[15] = mandala_post_factory(15)
    sidebar_template_data = sidebar_data()
    return render_template('index.html', mandalaData=template_data, sidebar_data=sidebar_template_data)

@app.route('/pages/header.html')
def header():
    return render_template('header.html')

@app.route('/post/<int:post_id>')
def render_post(post_id):
    template_data = {}
    template_data['prev_url'] = get_url_for_post(post_id - 1)
    template_data['next_url'] = get_url_for_post(post_id + 1)
    if (post_id in mandala_posts):
        template_data[post_id] = mandala_post_factory(post_id)   #.mandala_data_json_str()
        template_filename = 'postv2.html' 
    else:
        template_filename = 'post.html'
    return render_template(template_filename, post_id=post_id, mandalaData=template_data)

@app.route('/testmandala')
def render_testMandala():
    return render_template('/posts/testPost.html')

@app.route('/tests/<template_name>')
def render_test(template_name):
    # base directory for test templates
    test_templates_dir = os.path.join(app.template_folder, 'tests')

    # Construct full template path and validate existence
    template_path = f"tests/{template_name}"
    if not os.path.exists(os.path.join(test_templates_dir, template_name)):
       os.abort(404, description="Test template not found")
    
    return render_template(template_path)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://mbsmrtic:mvpw@localhost:5432/mvdb'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)
with app.app_context():
    db.drop_all()       ### Use this carefully - it deletes all tables and all data!!! 
    db.create_all()     # This creates tables for all models that are included in this context (aka in models/__init__.py)


with app.test_request_context():
    print(url_for('index'))
