from app.src.mandalas.mandaladata import MandalaPost, MandalaData, ShapeType, DataItem
import functools

from app.models.db import db
from app.models.mandala_cluster import MandalaCluster
from app.models.mandala_item import MandalaItem 
from app.models.mandala_cluster_item import MandalaClusterItem 
from sqlalchemy import select, exists 

class MandalaPost19(MandalaPost):
    @property 
    def mandala_num(self):
        return 19

    @property
    def title(self):
        return "Tree test"

    @property
    def posted_date_str(self):
        return "October, 2025"

    @property
    def post_text_html(self):
        return "Tree test "
    

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

    # This private method adds the mandala data to the database
    # We can remove this once we have forms etc for adding the data.
    # At that point instead of inputting the data in the code we will 
    #  just use the data that's already in the database.
    def __addDataToDb(self):
        def addDataItemsToDb(cluster: MandalaCluster, item_count: int):
            def ordinal(n):
                # Handle special cases for 11, 12, 13
                if 11 <= (n % 100) <= 13:
                    suffix = "th"
                else:
                    # Determine suffix based on last digit
                    last_digit = n % 10
                    if last_digit == 1:
                        suffix = "st"
                    elif last_digit == 2:
                        suffix = "nd"
                    elif last_digit == 3:
                        suffix = "rd"
                    else:
                        suffix = "th"
                return str(n) + suffix
            for i in range(1, item_count):
                numstr = ordinal(i)
                item_desc = f" {numstr} item in {cluster.name}"
                item = MandalaItem(desc=item_desc)
                db.session.add(item)
                db.session.commit()
                mci = MandalaClusterItem(clusterId=cluster.id, itemId=item.id)
                db.session.add(mci)

        cluster = MandalaCluster(
            mandalaId=self.mandala_num,
            name="trees",
            shape=ShapeType.LEAFY_TREE.value,
            offset=20,
            width=50,
            length=60,
            stroke="#888888",
            strokeWidth=1,
            fill="#888888",
            angleStart=0,
            )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 7)

        db.session.commit()

    def __getDataFromDb(self, mandala_data):
        # get array of item descriptions from database
        def getDataItemsForCluster(mc: MandalaCluster):
            stmt = (
                select(MandalaItem)
                .join(MandalaClusterItem, MandalaClusterItem.itemId == MandalaItem.id) 
                .where(MandalaClusterItem.clusterId == mc.id)
            )
            mandalaitems = db.session.execute(stmt).scalars().all()
            items = [DataItem(desc = mi.desc) for mi in mandalaitems]
            return items  

        stmt = select(MandalaCluster).where(MandalaCluster.mandalaId == self.mandala_num)
        mcs = db.session.execute(stmt).scalars()
        for mc in mcs:
            dataitems = getDataItemsForCluster(mc)
            cluster = mc.to_mandaladata_cluster(dataitems)
            mandala_data.clusters.append(cluster)
