from app.src.mandalas.mandala17 import MandalaPost17
from app.src.mandalas.mandala16 import MandalaPost16
# from app.src.mandalas.mandala18 import MandalaPost18


def mandala_post_factory(post_id): 
    # I'm using this data structure to explicitly create
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
    try:
        return mandala_posts[post_id]()
    except KeyError:
        raise ValueError(f"No mandala is available with post id {post_id}")
