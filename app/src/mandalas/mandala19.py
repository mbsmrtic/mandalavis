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
        return "Tree snowflake"

    @property
    def posted_date_str(self):
        return "October, 2025"

    @property
    def post_text_html(self):
        return "Tree Snowflake "
    

    @functools.cached_property
    def mandala_data_json_str(self):

        # if we haven't yet added the data describing this mandala to the database,
        #  then add it now
        stmt = select(exists().where(MandalaCluster.mandalaId == self.mandala_num))
        exists_ = db.session.execute(stmt).scalar()
        if not exists_:
            self.__addDataToDb()

        mandala_data = MandalaData()
        mandala_data.view_box = "20 30 550 550"
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

        # cluster = MandalaCluster(
        #     mandalaId=self.mandala_num,
        #     name="curly bracket",
        #     shape=ShapeType.CURLY_BRACKET .value,
        #     offset=30,
        #     width=50,
        #     length=60,
        #     stroke="#888888",
        #     strokeWidth=1,
        #     angleStart=0,
        #     )
        # db.session.add(cluster)
        # db.session.commit()
        # addDataItemsToDb(cluster, 7)

        cluster = MandalaCluster(
            mandalaId=self.mandala_num,
            name="snowflake",
            shape=ShapeType.TREE.value,
            offset=9,
            width=59,
            length=83,
            stroke="#888888",
            strokeWidth=1,
            fill="#888888",
            angleStart=0,
            )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 7)

        cluster = MandalaCluster(
            mandalaId=self.mandala_num,
            name="outer tree",
            shape=ShapeType.LEAFY_TREE.value,
            offset=86,
            width=33,
            length=48,
            stroke="#888888",
            strokeWidth=1,
            fill="#ffffff",
            angleStart=0,
            )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 7)


        cluster = MandalaCluster(
            mandalaId=self.mandala_num,
            name="leafy trees",
            shape=ShapeType.LEAFY_TREE.value,
            offset=57,
            width=50,
            length=60,
            stroke="#888888",
            strokeWidth=1,
            fill="#888888",
            angleStart=30,
            )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 7)

        cluster = MandalaCluster(
            mandalaId=self.mandala_num,
            name="arc",
            shape=ShapeType.ARC.value,
            offset=83,
            width=44,
            length=69,
            stroke="#888888",
            strokeWidth=1,
            fill="#ffffff",
            angleStart=0,
            zindex=-1,
            )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 7)

        cluster = MandalaCluster(
            mandalaId=self.mandala_num,
            name="curly",
            shape=ShapeType.CURLY_BRACKET.value,
            offset=85,
            width=45,
            length=69,
            stroke="#666666",
            strokeWidth=1,
            fill="#ffffff",
            angleStart=30,
            zindex=-2,
            )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 7)

        cluster = MandalaCluster(
            mandalaId=self.mandala_num,
            name="outer tree",
            shape=ShapeType.LEAFY_TREE.value,
            offset=86,
            width=33,
            length=48,
            stroke="#888888",
            strokeWidth=1,
            fill="#ffffff",
            angleStart=0,
            )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 7)

        cluster = MandalaCluster(
            mandalaId=self.mandala_num,
            name="dot",
            shape=ShapeType.DOT.value,
            offset=80,
            width=6,
            length=30,
            stroke="#666666",
            strokeWidth=1,
            fill="#666666",
            angleStart=15,
            zindex=-1,
            )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 13)

        cluster = MandalaCluster(
            mandalaId=self.mandala_num,
            name="outer dot",
            shape=ShapeType.DOT.value,
            offset=143,
            width=5,
            length=30,
            stroke="#ffffff",
            strokeWidth=1,
            fill="#666666",
            angleStart=32,
            zindex=-1,
            )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 7)

        cluster = MandalaCluster(
            mandalaId=self.mandala_num,
            name="curvy droplet",
            shape=ShapeType.CURVY_DROPLET.value,
            offset=85,
            width=27,
            length=53,
            stroke="#888888",
            strokeWidth=1,
            fill="#888888",
            angleStart=15,
            )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 13)

        cluster = MandalaCluster(
            mandalaId=self.mandala_num,
            name="outer arc",
            shape=ShapeType.DOTTED_ARC.value,
            offset=126,
            width=61,
            length=35,
            stroke="#666666",
            strokeWidth=1,
            fill="#ffffff",
            angleStart=15,
            zindex=-3,
            )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 13)

        cluster = MandalaCluster(
            mandalaId=self.mandala_num,
            name="outer dot 2",
            shape=ShapeType.DOT.value,
            offset=143,
            width=5,
            length=30,
            stroke="#ffffff",
            strokeWidth=1,
            fill="#666666",
            angleStart=28,
            zindex=-3,
            )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 13)

        cluster = MandalaCluster(
            mandalaId=self.mandala_num,
            name="inner droplet",
            shape=ShapeType.DROPLET.value,
            offset=21,
            width=20,
            length=23,
            stroke="#ffffff",
            strokeWidth=1,
            fill="#888888",
            angleStart=30,
            zindex=-3,
            )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 7)

        cluster = MandalaCluster(
            mandalaId=self.mandala_num,
            name="inner dot",
            shape=ShapeType.DOT.value,
            offset=18,
            width=4,
            length=0,
            stroke="#ffffff",
            strokeWidth=1,
            fill="#666666",
            angleStart=15,
            zindex=-3,
            )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 13)

        cluster = MandalaCluster(
            mandalaId=self.mandala_num,
            name="outer dotted arc",
            shape=ShapeType.DOTTED_ARC.value,
            offset=156,
            width=52,
            length=25,
            stroke="#666666",
            strokeWidth=1,
            fill="#ffffff",
            angleStart=0,
            zindex=0,
            )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 13)

        cluster = MandalaCluster(
            mandalaId=self.mandala_num,
            name="outer dotted arc",
            shape=ShapeType.DOT.value,
            offset=157,
            width=11,
            length=30,
            stroke="#ffffff",
            strokeWidth=1,
            fill="#888888",
            angleStart=0,
            zindex=0,
            )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 13)

        cluster = MandalaCluster(
            mandalaId=self.mandala_num,
            name="outer leafy",
            shape=ShapeType.LEAFY_TREE.value,
            offset=162,
            width=46,
            length=65,
            stroke="#888888",
            strokeWidth=1,
            fill="#888888",
            angleStart=15,
            zindex=-1,
            )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 13)

        cluster = MandalaCluster(
            mandalaId=self.mandala_num,
            name="outer curly",
            shape=ShapeType.CURLY_BRACKET.value,
            offset=157,
            width=52,
            length=82,
            stroke="#888888",
            strokeWidth=1,
            fill="#ffffff",
            angleStart=0,
            zindex=-2,
            )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 13)

        cluster = MandalaCluster(
            mandalaId=self.mandala_num,
            name="outer curly",
            shape=ShapeType.DROPLET.value,
            offset=-218,
            width=27,
            length=30,
            stroke="#ffffff",
            strokeWidth=1,
            fill="#888888",
            angleStart=0,
            zindex=-2,
            )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 13)

        cluster = MandalaCluster(
            mandalaId=self.mandala_num,
            name="outer dots",
            shape=ShapeType.DOT.value,
            offset=226,
            width=14,
            length=30,
            stroke="#888888",
            strokeWidth=1,
            fill="#888888",
            angleStart=7.5,
            zindex=0,
            )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 25)


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
