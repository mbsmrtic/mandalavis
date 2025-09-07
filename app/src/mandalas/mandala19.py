from app.src.mandalas.mandaladata import MandalaPost, MandalaData, ShapeType, DataItem

from app.models.db import db
from app.models.mandala_cluster import MandalaCluster
from app.models.mandala_item import MandalaItem 
from app.models.mandala_cluster_item import MandalaClusterItem 
from sqlalchemy import select, exists 

class MandalaPost19(ManalaPost):
    @property 
    def mandala_num(self):
        return 19

    @property
    def title(self):
        return ""

    @property
    def posted_date_str(self):
        return "September, 2025"

    @property
    def post_text_html(self):
        return "Colors "
    

    @functools.cached_property
    def mandala_data_json_str(self):

        # if we haven't yet added the data describing this mandala to the database,
        #  then add it now
        stmt = select(exists().where(MandalaCluster.mandalaId == self.mandala_num))
        exists_ = db.session.execute(stmt).scalar()
        if not exists_:
            self.__addDataToDb()

        mandala_data = MandalaData()
        mandala_data.view_box = "120 130 350 350"
        mandala_data.clusters = []

        self.__getDataFromDb(mandala_data)

        return mandala_data.model_dump_json()

