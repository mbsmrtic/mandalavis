from flask import Flask
from flask import render_template
from flask import url_for, send_from_directory
import os
from app.src.mandalas.mandala16 import MandalaData16
from app.src.mandalas.mandala17 import MandalaData17
from app.src.mandalas.mandaladata import MandalaData

app = Flask(__name__)

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/')
def index():
    template_data = {}
    mandala16 = MandalaData()
    template_data[16] = mandala16.create_mandala_data(16)
    mandala17 = MandalaData()
    template_data[17] = mandala17.create_mandala_data(17)
    return render_template('index.html', mandalaData=template_data)

@app.route('/pages/header.html')
def header():
    return render_template('header.html')

@app.route('/post/<int:post_id>')
def render_post(post_id):
    template_data = {}
    mandala_data = MandalaData()
    template_data[post_id] = mandala_data.create_mandala_data(post_id)
    return render_template(f'post.html', post_id=post_id, mandalaData=template_data)

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
