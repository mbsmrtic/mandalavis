from app.src.mandalas.mandaladata import MandalaPost, MandalaData, Cluster, ShapeType, DataItem, CompositeMandalaData
import functools

class MandalaPost13(MandalaPost):
    @property
    def title(self):
        return "Zooming mandalas"

    @property
    def posted_date_str(self):
        return "April 16, 2025"

    @property
    def post_text_html(self):
        return """This one is a mandala of mandalas. I added zoom in and zoom out buttons
        so you can see the beauty of Scalable Vector Graphics. Since they are 
        vector based - they are defined by mathematical equations, not fixed pixels,
        they can zoom in and out without losing their quality and shape. This 
        allows us to comfortably represent a large number of data points. Each of those, though, could represent a cluster so 
        that clicking on it brings us into a visualization of the cluster."""

    @functools.cached_property
    def mandala_data_json_str(self):
        composite_mandala_data = CompositeMandalaData()
        composite_mandala_data.view_box = "-250 -250 1400 1400"
        composite_mandala_data.mandalas = []
        for i in range(6):
            mandala_data = MandalaData(offset=250, angleStart=.5, i=i, c=6)
            self.__addMandalaClusters(mandala_data)
            composite_mandala_data.mandalas.append(mandala_data)

        for i in range(6):
            mandala_data = MandalaData(offset=400, angleStart=0, i=i, c=6)
            self.__addMandalaClusters(mandala_data)
            composite_mandala_data.mandalas.append(mandala_data)

        mandala_data = MandalaData(offset=0, angleStart=0)
        cluster = Cluster(
            clustername="center cluster",
            shape=ShapeType.DOT.value,
            offset=-150,
            width=300,
            length=300,
            svgAttrs={"stroke": "#666", "stroke-width": 3, "fill": "#white"},
            data=[DataItem(desc=f"dot {i}th item in center cluster") for i in range(1, 2)]
        )
        mandala_data.clusters.append(cluster)
        composite_mandala_data.mandalas.append(mandala_data)

        return composite_mandala_data.model_dump_json()

    # This private method adds the clusters to the mandala_data object
    def __addMandalaClusters(self, mandala_data: MandalaData):
        clustername = "outer curvy droplets"
        mandala_data.clusters.append(Cluster(
            clustername=clustername,
            shape=ShapeType.CURVY_DROPLETS.value,
            offset=72,
            width=25,
            length=25,
            data=[DataItem(desc=f" {i}th item in {clustername}") for i in range(1, 11)]
        ))

        clustername = "dots"
        mandala_data.clusters.append(Cluster(
            clustername=clustername,
            shape=ShapeType.DOT.value,
            offset=68,
            width=5,
            angleStart=6,
            svgAttrs={"fill": "#999"},
            data=[DataItem(desc=f" {i}th item in {clustername}") for i in range(1, 31)]
        ))

        clustername = "arcs"
        mandala_data.clusters.append(Cluster(
            clustername=clustername,
            shape=ShapeType.ARC.value,
            offset=63,
            width=24,
            length=13,
            angleStart=18,
            svgAttrs={"fill": "white"},
            data=[DataItem(desc=f" {i}th item in {clustername}") for i in range(1, 11)]
        ))

        clustername = "curly bracket"
        mandala_data.clusters.append(Cluster(
            clustername=clustername,
            shape=ShapeType.CURLY_BRACKET.value,
            offset=55,
            width=20,   
            length=20,         
            data=[DataItem(desc=f" {i}th item in {clustername}") for i in range(1, 11)]
        ))

        clustername = "spiral"
        mandala_data.clusters.append(Cluster(
            clustername=clustername,
            shape=ShapeType.SPIRAL.value,
            offset=54,
            width=15,
            angleStart=17,
            data=[DataItem(desc=f" {i}th item in {clustername}") for i in range(1, 11)]
        ))

        clustername = "dotted arc"
        mandala_data.clusters.append(Cluster(
            clustername=clustername,
            shape=ShapeType.DOTTED_ARC.value,
            offset=48,
            width=30,
            length=10,
            svgAttrs={"fill": "white"},
            data=[DataItem(desc=f" {i}th item in {clustername}") for i in range(1, 11)]
        ))

        clustername = "tilted right curvy droplet"
        mandala_data.clusters.append(Cluster(
            clustername=clustername,
            shape=ShapeType.TILTED_CURVY_DROPLET.value,
            offset=27,
            width=30,
            length=30,
            angleStart=21,
            tiltLeft=False,
            data=[DataItem(desc=f" {i}th item in {clustername}") for i in range(1, 11)]
        ))

        clustername = "tilted left curvy droplet"
        mandala_data.clusters.append(Cluster(
            clustername=clustername,
            shape=ShapeType.TILTED_CURVY_DROPLET.value,
            offset=18,
            width=30,
            length=30,
            angleStart=19.5,
            tiltLeft=True,
            data=[DataItem(desc=f" {i}th item in {clustername}") for i in range(1, 11)]
        ))

        clustername = "curvy droplets"
        mandala_data.clusters.append(Cluster(
            clustername=clustername,
            shape=ShapeType.CURVY_DROPLETS.value,
            offset=10,
            width=30,
            length=20,
            data=[DataItem(desc=f" {i}th item in {clustername}") for i in range(1, 11)]
        ))



