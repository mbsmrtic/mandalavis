from app.src.mandalas.mandaladata import MandalaPost, MandalaData, Cluster, ShapeType, DataItem
import functools

class MandalaPost16(MandalaPost):
    @property
    def title(self):
        return "Python generated data"

    @property
    def posted_date_str(self):
        return "May 11, 2025"

    @property
    def post_text_html(self):
        return "I'm still making mandalas that are fun for me. " \
        "But this mandala is the first one that is built from a dataset that was generated in Python on the server. " \
        "This is a big milestone towards making them into data visualizations that describe datasets. "

    @functools.cached_property
    def mandala_data_json_str(self):
        mandala_data = MandalaData()
        mandala_data.clusters = []
        cluster = Cluster(
            clustername="cluster 11",
            shape=ShapeType.CURLY_BRACKET.value,
            offset=95,
            width=45,
            length=70,
            svgAttrs={"stroke": "#666", "stroke-width": 1},
            data=[DataItem(desc=f"curly bracket {i}th item in cluster 11") for i in range(1, 9)]
        )
        mandala_data.clusters.append(cluster)

        cluster = Cluster(
            clustername="cluster 10",
            shape=ShapeType.DOT.value,
            offset=117,
            width=16,
            length=16,
            svgAttrs={"stroke": "#666", "stroke-width": 1},
            data=[DataItem(desc=f"dot {i}th item in cluster 10") for i in range(1, 9)]
        )
        mandala_data.clusters.append(cluster)

        cluster = Cluster(
            clustername="cluster 12",
            shape=ShapeType.DOT.value,
            offset=87,
            width=9,
            length=9,
            svgAttrs={"stroke": "#666", "stroke-width": 1},
            data=[DataItem(desc=f"dot {i}th item in cluster 12") for i in range(1, 9)]
        )
        mandala_data.clusters.append(cluster)

        cluster = Cluster(
            clustername="cluster 9",
            shape=ShapeType.DOTTED_ARC.value,
            offset=128,
            width=101,
            length=30,
            # angleStart=22.5,
            svgAttrs={"stroke": "#666", "stroke-width": 1},
            data=[DataItem(desc=f"dotted arc {i}th item in cluster 9") for i in range(1, 9)]
        )
        mandala_data.clusters.append(cluster)

        cluster = Cluster(
            clustername="cluster 7",
            shape=ShapeType.DROPLET.value,
            offset=135,
            width=35,
            length=-66,
            angleStart=22.5,
            svgAttrs={"stroke": "#888", "stroke-width": 1},
            data=[DataItem(desc=f"droplet {i}th item in cluster 7") for i in range(1, 9)]
        )
        mandala_data.clusters.append(cluster)

        cluster = Cluster(
            clustername="cluster 6",
            shape=ShapeType.ARC.value,
            offset=91,
            width=28,
            length=11,
            svgAttrs={"stroke": "#666", "stroke-width": 1},
            data=[DataItem(desc=f"arc {i}th item in cluster 6") for i in range(1, 9)]
        )
        mandala_data.clusters.append(cluster)

        cluster = Cluster(
            clustername="cluster 5",
            shape=ShapeType.ARC.value,
            offset=95,
            width=30,
            length=-14,
            angleStart=22.5,
            svgAttrs={"stroke": "#666", "stroke-width": 1},
            data=[DataItem(desc=f"arc {i}th item in cluster 5") for i in range(1, 9)]
        )
        mandala_data.clusters.append(cluster)

        cluster = Cluster(
            clustername="cluster 4",
            shape=ShapeType.DOTTED_ARC.value,
            offset=93,
            width=45,
            length=15,
            svgAttrs={"stroke": "#666", "stroke-width": 1},
            data=[DataItem(desc=f"dotted arc {i}th item in cluster 4") for i in range(1, 9)]
        )
        mandala_data.clusters.append(cluster)

        cluster = Cluster(
            clustername="cluster 3",
            shape=ShapeType.DOTTED_ARC.value,
            offset=90,
            width=44,
            length=-15,
            angleStart=22.5,
            svgAttrs={"stroke": "#666", "stroke-width": 1},
            data=[DataItem(desc=f"dotted arc {i}th item in cluster 3") for i in range(1, 9)]
        )
        mandala_data.clusters.append(cluster)

        cluster = Cluster(
            clustername="cluster 2",
            shape=ShapeType.SPIRAL.value,
            offset=58,
            width=23,
            length=30,
            svgAttrs={"stroke": "#666", "stroke-width": 1},
            data=[DataItem(desc=f"spiral {i}th item in cluster 2") for i in range(1, 9)]
        )
        mandala_data.clusters.append(cluster)

        cluster = Cluster(
            clustername="cluster 0",
            shape=ShapeType.CURVY_DROPLETS.value,
            offset=30,
            width=20,
            length=37,
            angleStart=22.5,
            svgAttrs={"stroke": "white", "stroke-width": 1},
            data=[DataItem(desc=f"curvy droplet {i}th item in cluster 0") for i in range(1, 9)]
        )
        mandala_data.clusters.append(cluster)

        cluster = Cluster(
            clustername="cluster 1",
            shape=ShapeType.CURLY_BRACKET.value,
            offset=28,
            width=23,
            length=30,
            svgAttrs={"stroke": "#666", "stroke-width": 1},
            data=[DataItem(desc=f"curly bracket {i}th item in cluster 1") for i in range(1, 9)]
        )
        mandala_data.clusters.append(cluster)

        cluster = Cluster(
            clustername="center",
            shape=ShapeType.DOT.value,
            offset=-30,
            width=60,
            length=60,
            svgAttrs={"stroke": "#666", "stroke-width": 1, "fill": "white"},
            data=[DataItem(desc=f"dot {i}th item in center cluster") for i in range(1, 2)]
        )
        mandala_data.clusters.append(cluster)

        return mandala_data.model_dump_json()
