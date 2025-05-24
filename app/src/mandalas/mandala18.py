from app.src.mandalas.mandaladata import MandalaPost, MandalaData, Cluster, ShapeType, DataItem
import functools

class MandalaPost18(MandalaPost):
    @property
    def title(self):
        return "Testing"

    @property
    def posted_date_str(self):
        return "May 19, 2025"

    @property
    def post_text_html(self):
        return " "

    @functools.cached_property
    def mandala_data_json_str(self):
        mandala_data = MandalaData()
        mandala_data.clusters = []
        clusterName = "2025"
        cluster = Cluster(
            clustername=clusterName,
            shape=ShapeType.NORDIC.value,
            offset=50,
            width=20,
            length=20,
            # angleStart=22.5,
            svgAttrs={"stroke": "#888", "stroke-width": 5},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 10)]
        )
        mandala_data.clusters.append(cluster)
        clusterName = "2024"
        cluster = Cluster(
            clustername=clusterName,
            shape=ShapeType.POTTED_PLANT.value,
            offset=20,
            width=20,
            length=20,
            # angleStart=22.5,
            svgAttrs={"stroke": "#888", "stroke-width": 1},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 2)]
        )
        mandala_data.clusters.append(cluster)
        return mandala_data.model_dump_json()
