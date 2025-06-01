from app.src.mandalas.mandaladata import MandalaPost, MandalaData, Cluster, ShapeType, DataItem
import functools

class MandalaPost18(MandalaPost):
    @property
    def title(self):
        return "Saguaro"

    @property
    def posted_date_str(self):
        return "June 1, 2025"

    @property
    def post_text_html(self):
        return " "

    @functools.cached_property
    def mandala_data_json_str(self):
        mandala_data = MandalaData()
        mandala_data.view_box = "120 130 350 350"
        mandala_data.clusters = []

        clusterName = "2021"
        mandala_data.clusters.append(Cluster(
            clustername=clusterName,
            shape=ShapeType.SPIRAL.value,
            offset=92,
            width=30,
            length=30,
            angleStart=5,
            svgAttrs={"stroke": "#888", "stroke-width": 2, "fill": "none"},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 7)]
        ))
        clusterName = "2020"
        mandala_data.clusters.append(Cluster(
            clustername=clusterName,
            shape=ShapeType.SPIRAL.value,
            offset=92,
            width=30,
            length=30,
            angleStart=25,
            tiltLeft=False,
            svgAttrs={"stroke": "#888", "stroke-width": 2, "fill": "none"},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 7)]
        ))
        # mandala_data.add_center_circle(106)

        clusterName = "2018"
        mandala_data.clusters.append(Cluster(
            clustername=clusterName,
            shape=ShapeType.DOT.value,
            offset=104,
            width=10,
            length=10,
            angleStart=38,
            svgAttrs={'fill': '#888'},  # "stroke": "#888", "stroke-width": 2, "fill": "#333"},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 7)]
        ))

        clusterName = "2017"
        mandala_data.clusters.append(Cluster(
            clustername=clusterName,
            shape=ShapeType.DOT.value,
            offset=104,
            width=10,
            length=10,
            angleStart=52,
            svgAttrs={'fill': '#888'},  # "stroke": "#888", "stroke-width": 2, "fill": "#333"},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 7)]
        ))
        clusterName = "2016"
        mandala_data.clusters.append(Cluster(
            clustername=clusterName,
            shape=ShapeType.DOT.value,
            offset=120,
            width=8,
            length=8,
            angleStart=15,
            svgAttrs={'fill': 'black'},  # "stroke": "#888", "stroke-width": 2, "fill": "#333"},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 7)]
        ))

        clusterName = "2019"
        mandala_data.clusters.append(Cluster(
            clustername=clusterName,
            shape=ShapeType.POTTED_PLANT.value,
            offset=75,
            width=20,
            length=40,
            angleStart=45,
            svgAttrs={'fill': '#888'},  # "stroke": "#888", "stroke-width": 2, "fill": "#333"},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 7)]
        ))

        clusterName = "2025"
        cluster = Cluster(
            clustername=clusterName,
            shape=ShapeType.DOT.value,
            offset=30,
            width=5,
            length=5,
            # angleStart=22.5,
            svgAttrs={"stroke": "#888", "stroke-width": 1, "fill": "white"},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 34)]
        )
        mandala_data.clusters.append(cluster)
        clusterName = "2024"
        cluster = Cluster(
            clustername=clusterName,
            shape=ShapeType.CURVY_DROPLETS.value,
            offset=35,
            width=20,
            length=20,
            # angleStart=22.5,
            # svgAttrs={"stroke": "#888", "stroke-width": 1},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 13)]
        )
        mandala_data.clusters.append(cluster)
        clusterName = "2024"
        mandala_data.clusters.append(Cluster(
            clustername=clusterName,
            shape=ShapeType.ARC.value,
            offset=35,
            width=20,
            length=30,
            # angleStart=22.5,
            svgAttrs={"stroke": "#888", "stroke-width": 2},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 13)]
        ))

        clusterName = "2023"
        mandala_data.clusters.append(Cluster(
            clustername=clusterName,
            shape=ShapeType.DROPLET.value,
            offset=42,
            width=35,
            length=40,
            angleStart=15,
            svgAttrs={"fill": "#888"},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 7)]
        ))

        clusterName = "2022"
        mandala_data.clusters.append(Cluster(
            clustername=clusterName,
            shape=ShapeType.ARC.value,
            offset=62,
            width=35,
            length=25,
            angleStart=15,
            svgAttrs={"stroke": "#888", "stroke-width": 2},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 7)]
        ))

        clusterName = "2021"
        mandala_data.clusters.append(Cluster(
            clustername=clusterName,
            shape=ShapeType.CURLY_BRACKET.value,
            offset=58,
            width=42,
            length=49,
            angleStart=15,
            svgAttrs={"stroke": "#888", "stroke-width": 2, "fill": "none"},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 7)]
        ))



        return mandala_data.model_dump_json()
