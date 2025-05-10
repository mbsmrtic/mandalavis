from app.src.mandalas.mandaladata import MandalaData, Cluster, ShapeType, DataItem

class MandalaData17(MandalaData):
    def __init__(self):
        super().__init__()
        # self.title = "Mandala 17"
        # self.description = "This is a test mandala with 10 clusters and 8 items in each cluster. The clusters are arranged in a circular pattern with different shapes and colors."
        # self.clusters = []

    def getMandalaData(self):
        cluster = Cluster(
            clustername="cluster 11",
            shape=ShapeType.CURLY_BRACKET.value,
            offset=95,
            width=45,
            length=70,
            svgAttrs={"stroke": "#666", "stroke-width": 1},
            data=[DataItem(desc=f"curly bracket {i}th item in cluster 10") for i in range(1, 9)]
        )
        self.add_cluster(cluster)
        cluster = Cluster(
            clustername="cluster 10",
            shape=ShapeType.DOT.value,
            offset=115,
            width=10,
            length=10,
            svgAttrs={"stroke": "#666", "stroke-width": 1},
            data=[DataItem(desc=f"dot {i}th item in cluster 10") for i in range(1, 9)]
        )
        self.add_cluster(cluster)
        cluster = Cluster(
            clustername="cluster 11",
            shape=ShapeType.DOT.value,
            offset=99,
            width=8,
            length=8,
            svgAttrs={"stroke": "#666", "stroke-width": 1},
            data=[DataItem(desc=f"dot {i}th item in cluster 11") for i in range(1, 9)]
        )
        self.add_cluster(cluster)
        cluster = Cluster(
            clustername="cluster 12",
            shape=ShapeType.DOT.value,
            offset=85,
            width=6,
            length=6,
            svgAttrs={"stroke": "#666", "stroke-width": 1},
            data=[DataItem(desc=f"dot {i}th item in cluster 11") for i in range(1, 9)]
        )
        self.add_cluster(cluster)
        cluster = Cluster(
            clustername="cluster 9",
            shape=ShapeType.DOTTED_ARC.value,
            offset=128,
            width=101,
            length=30,
            # angleStart=22.5,
            svgAttrs={"stroke": "#666", "stroke-width": 1},
            data=[DataItem(desc=f"arc {i}th item in cluster 9") for i in range(1, 9)]
        )
        # self.add_cluster(cluster)
        # cluster = Cluster(
        #     clustername="cluster 8",
        #     shape=ShapeType.ARC.value,
        #     offset=125,
        #     width=101,
        #     length=30,
        #     # angleStart=22.5,
        #     svgAttrs={"stroke": "#666", "stroke-width": 1},
        #     data=[DataItem(desc=f"arc {i}th item in cluster 8") for i in range(1, 9)]
        # )
        self.add_cluster(cluster)
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
        self.add_cluster(cluster)
        cluster = Cluster(
            clustername="cluster 6",
            shape=ShapeType.ARC.value,
            offset=91,
            width=28,
            length=11,
            svgAttrs={"stroke": "#666", "stroke-width": 1},
            data=[DataItem(desc=f"arc {i}th item in cluster 6") for i in range(1, 9)]
        )
        self.add_cluster(cluster)
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
        self.add_cluster(cluster)
        cluster = Cluster(
            clustername="cluster 4",
            shape=ShapeType.DOTTED_ARC.value,
            offset=93,
            width=45,
            length=15,
            svgAttrs={"stroke": "#666", "stroke-width": 1},
            data=[DataItem(desc=f"arc {i}th item in cluster 4") for i in range(1, 9)]
        )
        self.add_cluster(cluster)
        cluster = Cluster(
            clustername="cluster 3",
            shape=ShapeType.DOTTED_ARC.value,
            offset=90,
            width=44,
            length=-15,
            angleStart=22.5,
            svgAttrs={"stroke": "#666", "stroke-width": 1},
            data=[DataItem(desc=f"arc {i}th item in cluster 3") for i in range(1, 9)]
        )
        self.add_cluster(cluster)
        cluster = Cluster(
            clustername="cluster 2",
            shape=ShapeType.SPIRAL.value,
            offset=58,
            width=23,
            length=30,
            svgAttrs={"stroke": "#666", "stroke-width": 1},
            data=[DataItem(desc=f"arc {i}th item in cluster 2") for i in range(1, 9)]
        )
        self.add_cluster(cluster)
        cluster = Cluster(
            clustername="cluster 0",
            shape=ShapeType.CURVY_DROPLETS.value,
            offset=30,
            width=20,
            length=37,
            angleStart=22.5,
            svgAttrs={"stroke": "white", "stroke-width": 1},
            data=[DataItem(desc=f"arc {i}th item in cluster 0") for i in range(1, 9)]
        )
        self.add_cluster(cluster)
        cluster = Cluster(
            clustername="cluster 1",
            shape=ShapeType.CURLY_BRACKET.value,
            offset=28,
            width=23,
            length=30,
            svgAttrs={"stroke": "#666", "stroke-width": 1},
            data=[DataItem(desc=f"arc {i}th item in cluster 1") for i in range(1, 9)]
        )
        self.add_cluster(cluster)
        # mydata = MandalaData(clusters=clusters)
        return self.model_dump_json()