from app.src.mandalas.mandaladata import MandalaPost, MandalaData, Cluster, ShapeType, DataItem
import functools

class MandalaPost17(MandalaPost):
    @property
    def title(self):
        return "Sunflower"

    @property
    def posted_date_str(self):
        return "May 20, 2025"

    @property
    def post_text_html(self):
        return "My last mandala moved the data structure that defines the mandala from client side javascript " \
        " to server side python. " \
        " Here, the text (this text) and the title are also in serverside python." \
        " This keeps all the post specific changes in one place (e.g. mandala17.py), standardizes the html for a post, " \
        " and is a step towards moving the post text and data into a database. "

    @functools.cached_property
    def mandala_data_json_str(self):
        mandala_data = MandalaData()
        mandala_data.clusters = []
        clusterName = "2013"
        cluster = Cluster(
            clustername=clusterName,
            shape=ShapeType.CURLY_BRACKET.value,
            offset=171,
            width=55,
            length=80,
            # angleStart=11.25,
            svgAttrs={"fill": "#355e3b", "stroke": "#355e3b","stroke-width": 1},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 17)]
        )
        mandala_data.clusters.append(cluster)
        clusterName = "2013"
        cluster = Cluster(
            clustername=clusterName,
            shape=ShapeType.POTTED_PLANT.value,
            offset=156,
            width=30,
            length=80,
            angleStart=11.25,
            svgAttrs={"fill": "#1B601C", "stroke": "#EDE8D0"}, #, "stroke": "black", "stroke-width": 5},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 17)]
        )
        mandala_data.clusters.append(cluster)
        clusterName = "2014"
        cluster = Cluster(
            clustername=clusterName,
            shape=ShapeType.DROPLET.value,
            offset=180,
            width=90,
            length=-160,
            angleStart=22.5,
            svgAttrs={"fill": "#FFC125", "stroke": "#EDE8D0", "stroke-width": 5},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 9)]
        )
        mandala_data.clusters.append(cluster)
        clusterName = "2015"
        cluster = Cluster(
            clustername=clusterName,
            shape=ShapeType.DROPLET.value,
            offset=180,
            width=90,
            length=-160,
            # angleStart=22.5,
            svgAttrs={"fill": "#FFC125", "stroke": "#EDE8D0", "stroke-width": 5},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 9)]
        )
        mandala_data.clusters.append(cluster)

        clusterName = "2014"
        cluster = Cluster(
            clustername=clusterName,
            shape=ShapeType.DOT.value,
            offset=50,
            width=10,
            length=10,
            # angleStart=22.5,
            svgAttrs={"fill": "#FFDF00", "stroke": "#FFCC33"},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 27)]
        )
        mandala_data.clusters.append(cluster)
        clusterName = "2013"
        cluster = Cluster(
            clustername=clusterName,
            shape=ShapeType.DOT.value,
            offset=40,
            width=10,
            length=10,
            # angleStart=22.5,
            svgAttrs={"fill": "#FFCC33"},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 23)]
        )
        mandala_data.clusters.append(cluster)
        clusterName = "2012"
        cluster = Cluster(
            clustername=clusterName,
            shape=ShapeType.DOT.value,
            offset=30,
            width=10,
            length=10,
            # angleStart=22.5,
            svgAttrs={"fill": "#FFD766"},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 18)]
        )
        mandala_data.clusters.append(cluster)
        clusterName = "2011"
        cluster = Cluster(
            clustername=clusterName,
            shape=ShapeType.DOT.value,
            offset=20,
            width=10,
            length=10,
            angleStart=22.5,
            svgAttrs={"fill": "#FFC125"},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 13)]
        )
        mandala_data.clusters.append(cluster)
        clusterName = "2010"
        cluster = Cluster(
            clustername=clusterName,
            shape=ShapeType.DOT.value,
            offset=10,
            width=10,
            length=10,
            # angleStart=22.5,
            svgAttrs={"fill": "#FFDF4D"},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 9)]
        )
        mandala_data.clusters.append(cluster)
        return mandala_data.model_dump_json()

        # return clusters
