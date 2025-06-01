from app.src.mandalas.mandaladata import MandalaPost, MandalaData, Cluster, ShapeType, DataItem, CompositeMandalaData
import functools

class MandalaPost12(MandalaPost):
    @property
    def title(self):
        return "It sparks joy "

    @property
    def posted_date_str(self):
        return "April 11, 2025"

    @property
    def post_text_html(self):
        return """I added a new curved droplet shape. The simple droplet that I already had, 
        you can see in the outer layer of this mandala. 
        I was determined to add this new composite shape made up of three curved droplets. 
        It took way longer than it should have to figure out how to get the exact curves
        that I wanted and to make sure that resizing it maintains the same joyful shape. 
        I really didn't want a flat pancake or a tall beanpole. 
        The result finally feels exactly like the joyful shape that I imagined! 
        So maybe it was worth it and now I can move on with my life! """

    @functools.cached_property
    def mandala_data_json_str(self):
        mandala_data = MandalaData()
        mandala_data.view_box = "120 130 350 350"
        mandala_data.clusters = []
        cluster = Cluster(
            clustername="cluster 0",
            shape=ShapeType.CURLY_BRACKET.value,
            offset=70,
            width=30,
            length=23,
            data=[DataItem(desc=f"curly bracket {i}th item in cluster 0") for i in range(1, 11)]
        )
        mandala_data.clusters.append(cluster)

        mandala_data.clusters.append(Cluster(
            clustername="cluster 1",
            shape=ShapeType.DOT.value,
            offset= 96,
            width=6.5,
            data=[DataItem(desc=f"dot {i}th item in cluster 1") for i in range(1,11)]
        ))

        mandala_data.clusters.append(Cluster(
            clustername="cluster 2",
            shape=ShapeType.DOTTED_ARC.value,
            offset = 55,
            width=40,
            length=20,
            data=[DataItem(desc=f"dot {i}th item in cluster 2") for i in range(1,11)]
        ))
        mandala_data.clusters.append(Cluster(
            clustername="cluster 3",
            shape=ShapeType.CURVY_DROPLETS.value,
            offset = 27,
            width=15,
            length=30,
            svgAttrs={ 'fill': '#333'},
            data=[DataItem(desc=f"dot {i}th item in cluster 3") for i in range(1,11)]
        ))
        mandala_data.clusters.append(Cluster(
            clustername="cluster 4",
            shape=ShapeType.CURVY_DROPLETS.value,
            offset = 62,
            width=20,
            length=42,
            angleStart=18,
            data=[DataItem(desc=f"dot {i}th item in cluster 4") for i in range(1,11)]
        ))
        mandala_data.clusters.append(Cluster(
            clustername="cluster 5",
            shape=ShapeType.CURVY_DROPLETS.value,
            offset = 105,
            width=20,
            length=20,
            data=[DataItem(desc=f"dot {i}th item in cluster 5") for i in range(1,51)]
        ))
        mandala_data.clusters.append(Cluster(
            clustername="cluster 6",
            shape=ShapeType.DROPLET.value,
            offset = 122,
            width=20,
            length=20,
            angleStart=3.5,
            data=[DataItem(desc=f"dot {i}th item in cluster 6") for i in range(1,51)]
        ))


        mandala_data.add_center_circle(30)

        return mandala_data.model_dump_json()
