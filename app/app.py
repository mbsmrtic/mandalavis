from flask import Flask
from flask import render_template
from flask import url_for, send_from_directory
from jinja2 import TemplateNotFound 
import os
from app.src.mandalas.mandaladata import MandalaData, get_url_for_post
from app.src.mandalas.postfactory import mandala_post_factory 

app = Flask(__name__)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/')
def index():
    template_data = {}
    template_data[16] = mandala_post_factory(16)
    template_data[17] = mandala_post_factory(17)
    return render_template('index.html', mandalaData=template_data)

@app.route('/pages/header.html')
def header():
    return render_template('header.html')

@app.route('/post/<int:post_id>')
def render_post(post_id):
    template_data = {}
    #foo = mandala_post.mandala_data_json_str  # does this prevent it being called in the template? No 
    template_data['prev_url'] = get_url_for_post(post_id - 1)
    template_data['next_url'] = get_url_for_post(post_id + 1)
    if (post_id >= 16):
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

with app.test_request_context():
    print(url_for('index'))
