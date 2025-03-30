import sys
import os

sys.path.insert(0, '/var/www/mandalavis')

from app import app 
os.environ['FLASK_ENV'] = 'production'
application = app
