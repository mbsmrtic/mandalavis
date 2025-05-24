from app.src.mandalas.mandaladata import MandalaPost, MandalaData, Cluster, ShapeType, DataItem
import functools

class MandalaPost15(MandalaPost):
    @property
    def title(self):
        return "Interesting white space, interactivity and data driven(ness)"

    @property
    def posted_date_str(self):
        return "May 3, 2025"

    @property
    def post_text_html(self):
        return "<h3>Making mandalas that I like</h3> " \
            "For this mandala I played around a little with the white space. In the center " \
            "the white space makes a flower, or sun shape, and around the curved droplets " \
            "some white leaf or petal shapes emerge. " \
            "<h3>Moving towards mandala inspired data visualizations</h3> " \
            " The interactions are working pretty well now. Using the zoom buttons you can zoom in " \
            "much further than the browser alone will let you. And, introducing dragging! " \
            "You can now move the image around by grabbing and dragging it. </br> " \
            "Finally, this is the first of my mandalas that is data driven. " \
            "The mandala is generated from a JSON data structure instead of being defined with lines " \
            "of software. " \
            " Notice that " \
            "every shape now has it's own description. Those descriptions are in the data, not written " \
            "in lines of software. " \
            "The data structure for this mandala is defined in javascript, on the client side. " \
            "So the next step is to send the json data structure from the server, created in python " \
            "and representative of a dataset. "
    
    @functools.cached_property
    def mandala_data_json_str(self):
        mandala_data = MandalaData()
        mandala_data.clusters = []
        cluster = Cluster(
            clustername="cluster 0",
            shape=ShapeType.CURLY_BRACKET.value,
            offset=240.5,
            width=60,
            length=60,
            angleStart=23,
            svgAttrs={"stroke": "#666", "stroke-width": 2},
            data=[DataItem(desc=f"curly bracket {i}th item in cluster 0") for i in range(1, 16)]
        )
        mandala_data.clusters.append(cluster)

        cluster = Cluster(
            clustername="cluster 7",
            shape=ShapeType.DOT.value,
            offset=255,
            width=16,
            length=16,
            angleStart=11,
            data=[DataItem(desc=f"dot {i}th item in cluster 7") for i in range(1, 31)]
        )
        mandala_data.clusters.append(cluster)

        cluster = Cluster(
            clustername="cluster 1",
            shape=ShapeType.DOT.value,
            offset=214,
            width=32,
            length=32,
            angleStart=23,
            data=[DataItem(desc=f"dot {i}th item in cluster 1") for i in range(1, 16)]
        )
        mandala_data.clusters.append(cluster)
        
        cluster = Cluster(
            clustername="cluster 2",
            shape=ShapeType.SPIRAL.value,
            offset=200,
            width=50,
            length=50,
            angleStart=10,
            svgAttrs={"stroke": "#666", "stroke-width": 2, "fill": "#white"},
            data=[DataItem(desc=f"spiral {i}th item in cluster 2") for i in range(1, 16)]
        )
        mandala_data.clusters.append(cluster)

        cluster = Cluster(
            clustername="cluster 3",
            shape=ShapeType.DOTTED_ARC.value,
            offset=175,
            width=75,
            length=35,
            svgAttrs={"stroke": "#666", "stroke-width": 2},
            data=[DataItem(desc=f"dotted arc {i}th item in cluster 3") for i in range(1, 16)]
        )
        mandala_data.clusters.append(cluster)

        cluster = Cluster(
            
            clustername="cluster 4",
            shape=ShapeType.CURVY_DROPLETS.value,
            offset=105,
            width=80,
            length=80,
            data=[DataItem(desc=f"heart {i}th item in cluster 4") for i in range(1, 16)]
        )
        mandala_data.clusters.append(cluster)

        cluster = Cluster(
            clustername="cluster 5",
            shape=ShapeType.CURVY_DROPLET.value,
            offset=65,
            width=60,
            length=60,
            angleStart=12,
            data=[DataItem(desc=f"curvy droplet {i}th item in cluster 5") for i in range(1, 16)]
        )
        mandala_data.clusters.append(cluster)

        cluster = Cluster(
            clustername="cluster 6",
            shape=ShapeType.CURVY_DROPLET.value,
            offset=40,
            width=60,
            length=60,
            data=[DataItem(desc=f"curvy droplet {i}th item in cluster 6") for i in range(1, 16)]
        )
        mandala_data.clusters.append(cluster)

        cluster = Cluster(
            clustername="center cluster",
            shape=ShapeType.DOT.value,
            offset=-40,
            width=80,
            length=80,
            svgAttrs={"stroke": "#666", "stroke-width": 1, "fill": "#white"},
            data=[DataItem(desc=f"dot {i}th item in center cluster") for i in range(1, 2)]
        )
        mandala_data.clusters.append(cluster)

        return mandala_data.model_dump_json()
