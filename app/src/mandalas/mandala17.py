from app.src.mandalas.mandaladata import MandalaData, Cluster, ShapeType, DataItem

def createData():
    clusters = []
    clusterName = "2025"
    cluster = Cluster(
        clustername=clusterName,
        shape=ShapeType.DOT.value,
        offset=145,
        width=20,
        length=20,
        angleStart=22.5,
        svgAttrs={"stroke": "#888", "stroke-width": 1},
        data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 9)]
    )
    clusters.append(cluster)

    clusterName = "2024"
    cluster = Cluster(
        clustername=clusterName,
        shape=ShapeType.DOTTED_ARC.value,
        offset=128,
        width=101,
        length=30,
        # angleStart=22.5,
        svgAttrs={"stroke": "#666", "stroke-width": 1},
        data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 9)]
    )
    clusters.append(cluster)

    clusterName="2023"
    cluster = Cluster(
        clustername=clusterName,
        shape=ShapeType.DOT.value,
        offset=120,
        width=10,
        length=10,
        svgAttrs={"stroke": "#666", "stroke-width": 1},
        data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 9)]
    )
    clusters.append(cluster)

    clusterName = "2022"
    cluster = Cluster(
        clustername=clusterName,
        shape=ShapeType.DOT.value,
        offset=95,
        width=10,
        length=10,
        svgAttrs={"stroke": "#666", "stroke-width": 1},
        data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 9)]
    )
    clusters.append(cluster)

    clusterName = "2021"
    cluster = Cluster(
        clustername=clusterName,
        shape=ShapeType.DOT.value,
        offset=95,
        width=10,
        length=10,
        angleStart=22.5,
        svgAttrs={"stroke": "#666", "stroke-width": 1},
        data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 9)]
    )
    clusters.append(cluster)

    clusterName = "2020"
    cluster = Cluster(
        clustername=clusterName,
        shape=ShapeType.DOTTED_ARC.value,
        offset=93,
        width=45,
        length=15,
        svgAttrs={"stroke": "#666", "stroke-width": 1},
        data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 9)]
    )
    clusters.append(cluster)

    clusterName = "2019"
    cluster = Cluster(
        clustername=clusterName,
        shape=ShapeType.ARC.value,
        offset=91,
        width=28,
        length=11,
        svgAttrs={"stroke": "#666", "stroke-width": 1},
        data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 9)]
    )
    clusters.append(cluster)

    clusterName = "2018"
    cluster = Cluster(
        clustername=clusterName,
        shape=ShapeType.DOTTED_ARC.value,
        offset=90,
        width=44,
        length=-15,
        angleStart=22.5,
        svgAttrs={"stroke": "#666", "stroke-width": 1},
        data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 9)]
    )
    clusters.append(cluster)

    clusterName = "2017"
    cluster = Cluster(
        clustername=clusterName,
        shape=ShapeType.DOT.value,
        offset=85,
        width=6,
        length=6,
        svgAttrs={"stroke": "#666", "stroke-width": 1},
        data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 9)]
    )
    clusters.append(cluster)

    clusterName = "2016"
    cluster = Cluster(
        clustername=clusterName,
        shape=ShapeType.DOT.value,
        offset=58,
        width=15,
        length=15,
        svgAttrs={"stroke": "#666", "stroke-width": 1},
        data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 9)]
    )
    clusters.append(cluster)

    clusterName = "2015"
    cluster = Cluster(
        clustername=clusterName,
        shape=ShapeType.DOT.value,
        offset=45,
        width=10,
        length=10,
        angleStart=22.5,
        svgAttrs={"stroke": "white", "stroke-width": 1},
        data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 9)]
    )
    clusters.append(cluster)

    clusterName = "2014"
    cluster = Cluster(
        clustername=clusterName,
        shape=ShapeType.DOT.value,
        offset=20,
        width=10,
        length=10,
        svgAttrs={"stroke": "#666", "stroke-width": 1},
        data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 9)]
    )
    clusters.append(cluster)
    return clusters

class MandalaData17(MandalaData):
    def __init__(self):
        super().__init__()

    # This is an implementation of the abstract method from MandalaData.
    def createMandalaData(self):
        clusterName = "2025"
        cluster = Cluster(
            clustername=clusterName,
            shape=ShapeType.DOT.value,
            offset=145,
            width=20,
            length=20,
            angleStart=22.5,
            svgAttrs={"stroke": "#888", "stroke-width": 1},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 9)]
        )
        self.add_cluster(cluster)
        clusterName = "2024"
        cluster = Cluster(
            clustername=clusterName,
            shape=ShapeType.DOTTED_ARC.value,
            offset=128,
            width=101,
            length=30,
            # angleStart=22.5,
            svgAttrs={"stroke": "#666", "stroke-width": 1},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 9)]
        )
        self.add_cluster(cluster)
        clusterName="2023"
        cluster = Cluster(
            clustername=clusterName,
            shape=ShapeType.DOT.value,
            offset=120,
            width=10,
            length=10,
            svgAttrs={"stroke": "#666", "stroke-width": 1},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 9)]
        )
        self.add_cluster(cluster)
        clusterName = "2022"
        cluster = Cluster(
            clustername=clusterName,
            shape=ShapeType.DOT.value,
            offset=95,
            width=10,
            length=10,
            svgAttrs={"stroke": "#666", "stroke-width": 1},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 9)]
        )
        self.add_cluster(cluster)
        clusterName = "2021"
        cluster = Cluster(
            clustername=clusterName,
            shape=ShapeType.DOT.value,
            offset=95,
            width=10,
            length=10,
            angleStart=22.5,
            svgAttrs={"stroke": "#666", "stroke-width": 1},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 9)]
        )
        self.add_cluster(cluster)
        clusterName = "2020"
        cluster = Cluster(
            clustername=clusterName,
            shape=ShapeType.DOTTED_ARC.value,
            offset=93,
            width=45,
            length=15,
            svgAttrs={"stroke": "#666", "stroke-width": 1},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 9)]
        )
        self.add_cluster(cluster)
        clusterName = "2019"
        cluster = Cluster(
            clustername=clusterName,
            shape=ShapeType.ARC.value,
            offset=91,
            width=28,
            length=11,
            svgAttrs={"stroke": "#666", "stroke-width": 1},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 9)]
        )
        self.add_cluster(cluster)
        clusterName = "2018"
        cluster = Cluster(
            clustername=clusterName,
            shape=ShapeType.DOTTED_ARC.value,
            offset=90,
            width=44,
            length=-15,
            angleStart=22.5,
            svgAttrs={"stroke": "#666", "stroke-width": 1},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 9)]
        )
        self.add_cluster(cluster)
        clusterName = "2017"
        cluster = Cluster(
            clustername=clusterName,
            shape=ShapeType.DOT.value,
            offset=85,
            width=6,
            length=6,
            svgAttrs={"stroke": "#666", "stroke-width": 1},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 9)]
        )
        self.add_cluster(cluster)
        clusterName = "2016"
        cluster = Cluster(
            clustername=clusterName,
            shape=ShapeType.DOT.value,
            offset=58,
            width=15,
            length=15,
            svgAttrs={"stroke": "#666", "stroke-width": 1},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 9)]
        )
        self.add_cluster(cluster)
        clusterName = "2015"
        cluster = Cluster(
            clustername=clusterName,
            shape=ShapeType.DOT.value,
            offset=45,
            width=10,
            length=10,
            angleStart=22.5,
            svgAttrs={"stroke": "white", "stroke-width": 1},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 9)]
        )
        self.add_cluster(cluster)
        clusterName = "2014"
        cluster = Cluster(
            clustername=clusterName,
            shape=ShapeType.DOT.value,
            offset=20,
            width=10,
            length=10,
            svgAttrs={"stroke": "#666", "stroke-width": 1},
            data=[DataItem(desc=f" {i}th item in {clusterName}") for i in range(1, 9)]
        )
        self.add_cluster(cluster)
        return self.model_dump_json()