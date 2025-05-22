from flask import current_app, url_for
from jinja2.exceptions import TemplateNotFound
from app.src.mandalas.postfactory import mandala_post_factory

# This method is used to get the next and previous urls for a post.
# It is called in app.py
def get_url_for_post(post_id):
   ret_url = None
   try:
    #    template_file_name = f'/post/{post_id}'
       template_file_name = f'posts/post{post_id}.html'
       # We use the jinja2 template engine to check if the
       # template exists. 
       current_app.jinja_env.get_template(template_file_name)
       # The template exists
       ret_url = url_for('render_post', post_id=post_id)
       print(f'{template_file_name} found')
   except TemplateNotFound:
       # The template does not exist
       # Check to see if it's in the post factory
        try: 
            mandala_post_factory(post_id)
            # The post exists in the factory
            ret_url = url_for('render_post', post_id=post_id)
            print(f'{template_file_name} found')
        except ValueError:
            print(f'{template_file_name} not found')
   return ret_url
