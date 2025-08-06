from app.src.mandalas.mandaladata import MandalaPost, MandalaData, Cluster, ShapeType, DataItem
import functools

from app.models.db import db
from app.models.mandala_cluster import MandalaCluster
from app.models.mandala_item import MandalaItem
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

        db.session.add(MandalaCluster(
            mandalaId=19,
            name="2021",
            shape=ShapeType.DOT.value,
            offset=120,
            width=8,
            length=8,
            fill="black",
            angleStart=15
        ))

        db.session.add(MandalaCluster(
            mandalaId=19,
            name="2020",
            shape=ShapeType.POTTED_PLANT.value,
            offset=75,
            width=20,
            length=40,
            fill="#888",
            angleStart=45
        ))

        db.session.add(MandalaCluster(
            mandalaId=19,
            name="2019",
            shape=ShapeType.SPIRAL.value,
            offset=32,
            width=5,
            length=5,
            stroke="#888",
            strokeWidth=1,
            fill="white"
        ))

        db.session.add(MandalaCluster(
            mandalaId=19,
            name="2018",
            shape=ShapeType.CURVY_DROPLETS.value,
            offset=35,
            width=20,
            length=20
        ))

        db.session.add(MandalaCluster(
            mandalaId=19,
            name="2017",
            shape=ShapeType.ARC.value,
            offset=35,
            width=20,
            length=30,
            stroke="#888",
            strokeWidth=2
        ))

        db.session.add(MandalaCluster(
            mandalaId=19,
            name="2016",
            shape=ShapeType.DROPLET.value,
            offset=42,
            width=35,
            length=40,
            fill="#888",
            angleStart=15
        ))

        db.session.add(MandalaCluster(
            mandalaId=19,
            name="2015",
            shape=ShapeType.ARC.value,
            offset=62,
            width=35,
            length=25,
            stroke="#888",
            strokeWidth=2,
            angleStart=15
        ))

        db.session.add(MandalaCluster(
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
        ))

        db.session.commit()

    def __getClusterFromDb(self, clusterName):
        stmt = select(MandalaCluster).where(MandalaCluster.mandalaId == 19, MandalaCluster.name == clusterName)
        mc = db.session.execute(stmt).scalars().first()
        return mc        
    
    def __getDataFromDb(self, mandala_data):
        clusterName = "2025"
        mc = self.__getClusterFromDb(clusterName)
        mandala_data.clusters.append(Cluster(
            clustername=clusterName,
            shape=mc.shape,
            offset=mc.offset,
            width=mc.width,
            length=mc.length,
            angleStart=mc.angleStart,
            svgAttrs={"stroke": mc.stroke, "stroke-width": mc.strokeWidth, "fill": mc.fill},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 7)]
        ))
        clusterName = "2024"
        mc = self.__getClusterFromDb(clusterName)
        mandala_data.clusters.append(Cluster(
            clustername=clusterName,
            shape=mc.shape,
            offset=mc.offset,
            width=mc.width,
            length=mc.length,
            angleStart=mc.angleStart,
            tiltLeft=False,
            svgAttrs={"stroke": mc.stroke, "stroke-width": mc.strokeWidth, "fill": mc.fill},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 7)]
        ))
        # mandala_data.add_center_circle(106)

        clusterName = "2023"
        mc = self.__getClusterFromDb(clusterName)
        mandala_data.clusters.append(Cluster(
            clustername=clusterName,
            shape=mc.shape,
            offset=mc.offset,
            width=mc.width,
            length=mc.length,
            angleStart=mc.angleStart,
            svgAttrs={'fill': mc.fill},  # "stroke": "#888", "stroke-width": 2, "fill": "#333"},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 7)]
        ))

        clusterName = "2022"
        mc = self.__getClusterFromDb(clusterName)
        mandala_data.clusters.append(Cluster(
            clustername=clusterName,
            shape=mc.shape,
            offset=mc.offset,
            width=mc.width,
            length=mc.length,
            angleStart=mc.angleStart,
            svgAttrs={'fill': mc.fill},  # "stroke": "#888", "stroke-width": 2, "fill": "#333"},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 7)]
        ))
        clusterName = "2021"
        mc = self.__getClusterFromDb(clusterName)
        mandala_data.clusters.append(Cluster(
            clustername=clusterName,
            shape=mc.shape,
            offset=mc.offset,
            width=mc.width,
            length=mc.length,
            angleStart=mc.angleStart,
            svgAttrs={'fill': mc.fill},  # "stroke": "#888", "stroke-width": 2, "fill": "#333"},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 7)]
        ))

        clusterName = "2020"
        mc = self.__getClusterFromDb(clusterName)
        mandala_data.clusters.append(Cluster(
            clustername=clusterName,
            shape=mc.shape,
            offset=mc.offset,
            width=mc.width,
            length=mc.length,
            angleStart=mc.angleStart,
            svgAttrs={'fill': mc.fill}, 
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 7)]
        ))

        clusterName = "2019"
        mc = self.__getClusterFromDb(clusterName)
        cluster = Cluster(
            clustername=clusterName,
            shape=mc.shape,
            offset=mc.offset,
            width=mc.width,
            length=mc.length,
            angleStart=mc.angleStart,
            svgAttrs={"stroke": mc.stroke, "stroke-width": mc.strokeWidth, "fill": mc.fill},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 34)]
        )
        mandala_data.clusters.append(cluster)

        clusterName = "2018"
        mc = self.__getClusterFromDb(clusterName)
        cluster = Cluster(
            clustername=clusterName,
            shape=mc.shape,
            offset=mc.offset,
            width=mc.width,
            length=mc.length,
            # angleStart=22.5,
            # svgAttrs={"stroke": "#888", "stroke-width": 1},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 13)]
        )
        mandala_data.clusters.append(cluster)

        clusterName = "2017"
        mc = self.__getClusterFromDb(clusterName)
        mandala_data.clusters.append(Cluster(
            clustername=clusterName,
            shape=mc.shape,
            offset=mc.offset,
            width=mc.width,
            length=mc.length,
            # angleStart=22.5,
            svgAttrs={"stroke": mc.stroke, "stroke-width": mc.strokeWidth},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 13)]
        ))

        clusterName = "2016"
        mc = self.__getClusterFromDb(clusterName)
        mandala_data.clusters.append(Cluster(
            clustername=clusterName,
            shape=mc.shape,
            offset=mc.offset,
            width=mc.width,
            length=mc.length,
            angleStart=mc.angleStart,
            svgAttrs={"fill": mc.fill},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 7)]
        ))

        clusterName = "2015"
        mc = self.__getClusterFromDb(clusterName)
        mandala_data.clusters.append(Cluster(
            clustername=clusterName,
            shape=mc.shape,
            offset=mc.offset,
            width=mc.width,
            length=mc.length,
            angleStart=mc.angleStart,
            svgAttrs={"stroke": mc.stroke, "stroke-width": mc.strokeWidth},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 7)]
        ))

        clusterName = "2014"
        mc = self.__getClusterFromDb(clusterName)
        mandala_data.clusters.append(Cluster(
            clustername=clusterName,
            shape=mc.shape,
            offset=mc.offset,
            width=mc.width,
            length=mc.length,
            angleStart=mc.angleStart,
            svgAttrs={"stroke": mc.stroke, "stroke-width": mc.strokeWidth, "fill": mc.fill},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 7)]
        ))

    
