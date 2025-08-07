from app.src.mandalas.mandaladata import MandalaPost, MandalaData, Cluster, ShapeType, DataItem
import functools

from app.models.db import db
from app.models.mandala_cluster import MandalaCluster
from app.models.mandala_item import MandalaItem
from app.models.mandala_cluster_item import MandalaClusterItem
from sqlalchemy import select, exists

class MandalaPost19(MandalaPost):
    @property
    def title(self):
        return "Saguaro"

    @property
    def posted_date_str(self):
        return "August 3, 2025"

    @property
    def post_text_html(self):
        return " "

    @functools.cached_property
    def mandala_data_json_str(self):

        # if we haven't yet added the data describing this mandala to the database,
        #   then add it now
        stmt = select(exists().where(MandalaCluster.mandalaId == 19))
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

        clusterName = "2025"
        cluster = MandalaCluster(
            mandalaId=19,
            name=clusterName,
            shape=ShapeType.SPIRAL.value,
            offset=92,
            width=30,
            length=30,
            stroke="#888",
            strokeWidth=2,
            fill="none",
            angleStart=5
            )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 7)

        clusterName = "2024"
        cluster = MandalaCluster(
            mandalaId=19,
            name=clusterName,
            shape=ShapeType.SPIRAL.value,
            offset=92,
            width=30,
            length=30,
            stroke="#888",
            strokeWidth=2,
            fill="none",
            angleStart=25
            )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 7)

        clusterName = "2023"
        cluster = MandalaCluster(
            mandalaId=19,
            name=clusterName,
            shape=ShapeType.DOT.value,
            offset=104,
            width=10,
            length=10,
            fill="#888",
            angleStart=38
        )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 7)

        clusterName = "2022"
        cluster = MandalaCluster(
            mandalaId=19,
            name=clusterName,
            shape=ShapeType.DOT.value,
            offset=104,
            width=10,
            length=10,
            fill="#888",
            angleStart=52,
        )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 7)

        cluster = MandalaCluster(
            mandalaId=19,
            name="2021",
            shape=ShapeType.DOT.value,
            offset=120,
            width=8,
            length=8,
            fill="black",
            angleStart=15
        )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 7)

        cluster = MandalaCluster(
            mandalaId=19,
            name="2020",
            shape=ShapeType.POTTED_PLANT.value,
            offset=75,
            width=20,
            length=40,
            fill="#888",
            angleStart=45
        )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 7)

        cluster = MandalaCluster(
            mandalaId=19,
            name="2019",
            shape=ShapeType.SPIRAL.value,
            offset=32,
            width=5,
            length=5,
            stroke="#888",
            strokeWidth=1,
            fill="white"
        )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 34)

        cluster = MandalaCluster(
            mandalaId=19,
            name="2018",
            shape=ShapeType.CURVY_DROPLETS.value,
            offset=35,
            width=20,
            length=20,
            fill="#666"
        )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 13)

        cluster = MandalaCluster(
            mandalaId=19,
            name="2017",
            shape=ShapeType.ARC.value,
            offset=35,
            width=20,
            length=30,
            stroke="#888",
            strokeWidth=2
        )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 13)

        cluster = MandalaCluster(
            mandalaId=19,
            name="2016",
            shape=ShapeType.DROPLET.value,
            offset=42,
            width=35,
            length=40,
            fill="#888",
            angleStart=15
        )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 7)

        cluster = MandalaCluster(
            mandalaId=19,
            name="2015",
            shape=ShapeType.ARC.value,
            offset=62,
            width=35,
            length=25,
            stroke="#888",
            strokeWidth=2,
            angleStart=15
        )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 7)

        cluster = MandalaCluster(
            mandalaId=19,
            name="2014",
            shape=ShapeType.CURLY_BRACKET.value,
            offset=58,
            width=42,
            length=49,
            stroke="#888",
            strokeWidth=2,
            fill="none",
            angleStart=15
        )
        db.session.add(cluster)
        db.session.commit()
        addDataItemsToDb(cluster, 7)

        db.session.commit()

    def __getClusterFromDb(self, clusterName):
        stmt = select(MandalaCluster).where(MandalaCluster.mandalaId == 19, MandalaCluster.name == clusterName)
        mc = db.session.execute(stmt).scalars().first()
        return mc        
    
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

        mc = self.__getClusterFromDb("2025")
        dataitems = getDataItemsForCluster(mc)
        cluster = mc.to_mandaladata_cluster(dataitems)
        mandala_data.clusters.append(cluster)

        mc = self.__getClusterFromDb("2024")
        dataitems = getDataItemsForCluster(mc)
        cluster = mc.to_mandaladata_cluster(dataitems)
        mandala_data.clusters.append(cluster)

        mc = self.__getClusterFromDb("2023")
        dataitems = getDataItemsForCluster(mc)
        mandala_data.clusters.append(mc.to_mandaladata_cluster(dataitems))

        mc = self.__getClusterFromDb("2022")
        dataitems = getDataItemsForCluster(mc)
        mandala_data.clusters.append(mc.to_mandaladata_cluster(dataitems))

        mc = self.__getClusterFromDb("2021")
        dataitems = getDataItemsForCluster(mc)
        mandala_data.clusters.append(mc.to_mandaladata_cluster(dataitems))

        mc = self.__getClusterFromDb("2020")
        dataitems = getDataItemsForCluster(mc)
        mandala_data.clusters.append(mc.to_mandaladata_cluster(dataitems))

        mc = self.__getClusterFromDb("2019")
        dataitems = getDataItemsForCluster(mc)
        mandala_data.clusters.append(mc.to_mandaladata_cluster(dataitems))

        mc = self.__getClusterFromDb("2017")
        dataitems = getDataItemsForCluster(mc)
        mandala_data.clusters.append(mc.to_mandaladata_cluster(dataitems))

        mc = self.__getClusterFromDb("2018")
        dataitems = getDataItemsForCluster(mc)
        mandala_data.clusters.append(mc.to_mandaladata_cluster(dataitems))

        mc = self.__getClusterFromDb("2016")
        dataitems = getDataItemsForCluster(mc)
        mandala_data.clusters.append(mc.to_mandaladata_cluster(dataitems))

        mc = self.__getClusterFromDb("2015")
        dataitems = getDataItemsForCluster(mc)
        mandala_data.clusters.append(mc.to_mandaladata_cluster(dataitems))

        mc = self.__getClusterFromDb("2014")
        dataitems = getDataItemsForCluster(mc)
        mandala_data.clusters.append(mc.to_mandaladata_cluster(dataitems))

    
