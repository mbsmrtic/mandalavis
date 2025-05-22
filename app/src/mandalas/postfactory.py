from app.src.mandalas.mandala17 import MandalaPost17
from app.src.mandalas.mandala16 import MandalaPost16
# from app.src.mandalas.mandala18 import MandalaPost18

# I'm using the mandala_posts data structure to explicitly create
#  the instances instead of dymamically creating them because 
#  this is just so much more readable. It's down side is that every
#  time you add a new post - you have to add it here. In the future we 
#  may decide to create it dynamically. But for now, we will go with the more
#  readable solution. (See comments at the bottom of this file for dynamic solution)
mandala_posts = {
    16: MandalaPost16,
    17: MandalaPost17,
    # 18: MandalaPost18,
}

def mandala_post_factory(post_id): 
    try:
        return mandala_posts[post_id]()
    except KeyError:
        raise ValueError(f"No mandala is available with post id {post_id}")
    
    # def create_mandala_data(self, postid):
    #     try:
    #         module_name = f"app.src.mandalas.mandala{postid}"
    #         # Documentation for abspath:
    #         #   https://docs.python.org/3/library/os.path.html#os.path.abspath 
    #         base_dir = os.path.dirname(os.path.abspath(__file__))
    #         file_path = os.path.join(base_dir, f'mandala{postid}.py')
    #         spec = importlib.util.spec_from_file_location(module_name, file_path)
    #         module = importlib.util.module_from_spec(spec)
    #         spec.loader.exec_module(module)
    #     except ModuleNotFoundError as e:
    #         print(f"Module not found: {e}")
    #     except ImportError as e:
    #         print(f"Import error: {e}")
    #     except Exception as e:
    #         print(f"Other error: {e}")
    #     else:
    #         # If the module was loaded successfully, we can call the createData functions
    #         post_class = getattr(module, f"Mandala{postid}")
    #         post_instance = post_class()
    #         self.clusters = post_instance.createClusterData()
    #     return self.model_dump_json()

