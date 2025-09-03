from app.src.mandalas.mandaladata import MandalaPost, MandalaData, Cluster, ShapeType, DataItem
import functools

from app.models.db import db
from app.models.mandala_cluster import MandalaCluster
from app.models.mandala_item import MandalaItem
from app.models.mandala_cluster_item import MandalaClusterItem
from sqlalchemy import select, exists

class MandalaPost18(MandalaPost):
    @property 
    def mandala_num(self):
        return 18

    @property
    def title(self):
        return "Saguaro"

    @property
    def posted_date_str(self):
        return "August 22, 2025"

    @property
    def post_text_html(self):
        return "Big update with this mandala. I've added a control panel for changing the mandala. " \
        "Users can now change the shapes and their size, color, angle and distance from the center. " \
        "These changes are impermanent. At some point I'll add the ability to save your changes " \
        " and edit the underlying data. But for now, experiment and have fun! "
    

    @functools.cached_property
    def mandala_data_json_str(self):

        # if we haven't yet added the data describing this mandala to the database,
        #   then add it now
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
            name="left outer spiral",
            shape=ShapeType.SPIRAL.value,
            offset=92,
            width=30,
            length=30,
            stroke="#000000",
            strokeWidth=2,
            fill="transparent",
            angleStart=20,
            tiltLeft=True,
            )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 7)

        cluster = MandalaCluster(
            mandalaId=self.mandala_num,
            name="right outer spiral",
            shape=ShapeType.SPIRAL.value,
            offset=92,
            width=30,
            length=30,
            stroke="#000000",
            strokeWidth=2,
            fill="transparent",
            angleStart=40,
            )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 7)

        cluster = MandalaCluster(
            mandalaId=self.mandala_num,
            name="right dot",
            shape=ShapeType.DOT.value,
            offset=104,
            width=10,
            length=10,
            fill="#888",
            angleStart=7,
        )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 7)

        cluster = MandalaCluster(
            mandalaId=self.mandala_num,
            name="left dot",
            shape=ShapeType.DOT.value,
            offset=104,
            width=10,
            length=10,
            fill="#888",
            angleStart=53,
        )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 7)

        cluster = MandalaCluster(
            mandalaId=self.mandala_num,
            name="outer dot",
            shape=ShapeType.DOT.value,
            offset=120,
            width=8,
            length=8,
            fill="#666666",
            angleStart=30,
        )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 7)

        cluster = MandalaCluster(
            mandalaId=self.mandala_num,
            name="potted plant",
            shape=ShapeType.POTTED_PLANT.value,
            offset=75,
            width=20,
            length=40,
            fill="#888",
            angleStart=0,
        )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 7)

        cluster = MandalaCluster(
            mandalaId=self.mandala_num,
            name="inner spirals",
            shape=ShapeType.SPIRAL.value,
            offset=32,
            width=5,
            length=5,
            stroke="#888",
            strokeWidth=1,
            fill="#ffffff",
        )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 34)

        cluster = MandalaCluster(
            mandalaId=self.mandala_num,
            name="droplets",
            shape=ShapeType.CURVY_DROPLETS.value,
            offset=35,
            width=20,
            length=20,
            angleStart=15,
            fill="#666",
        )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 13)

        cluster = MandalaCluster(
            mandalaId=self.mandala_num,
            name="arc around droplet",
            shape=ShapeType.ARC.value,
            offset=62,
            width=35,
            length=25,
            stroke="#888",
            strokeWidth=2,
            angleStart=30,
            zindex=1,
        )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 7)

        cluster = MandalaCluster(
            mandalaId=self.mandala_num,
            name="arc around droplets",
            shape=ShapeType.ARC.value,
            offset=35,
            width=20,
            length=30,
            angleStart=15,
            stroke="#000000",
            strokeWidth=2,
            zindex=2,
        )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 13)

        cluster = MandalaCluster(
            mandalaId=self.mandala_num,
            name="large droplet",
            shape=ShapeType.DROPLET.value,
            offset=42,
            width=34,
            length=40,
            fill="#000000",
            angleStart=30,
        )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 7)

        cluster = MandalaCluster(
            mandalaId=self.mandala_num,
            name="curly bracket",
            shape=ShapeType.CURLY_BRACKET.value,
            offset=58,
            width=42,
            length=49,
            stroke="#000000",
            strokeWidth=2,
            fill="transparent",
            angleStart=30,
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

