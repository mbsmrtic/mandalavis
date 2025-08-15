# Mandaladata.py
# The following code defines a set of classes and enums to represent the data structure for a mandala.
# The code is designed to be used in a web application, specifically for creating and managing mandalas.
# from app.src.mandalas.mandaladata import MandalaData, Cluster, ShapeType, DataItem
# The pydantic library is used for data validation and settings management using Python type annotations
from pydantic import BaseModel, Field, ConfigDict
from enum import Enum
from typing import Optional, List
from abc import ABC, abstractmethod
import functools

# The ShapeType enum defines the different shapes that can be used in the clusters.
# The values here (e.g. "ArcShape") must match the shape class names defined in 
# the javascript files defined in  /app/static/shapes/
class ShapeType(str, Enum):
    ARC = "ArcShape"
    BETWEEN_DOTS_DOT = "BetweenDotsDotShape"
    CURLY_BRACKET = "CurlyBracket"
    CURVY_DROPLETS = "CurvyDroplets"
    CURVY_DROPLET = "CurvyDroplet"
    DOTTED_ARC = "DottedArcShape"
    DOT = "DotShape"
    DROPLET = "DropletShape"
    IMAGE = "ImageShape"
    NORDIC = "NordicShape"
    SPIRAL = "SpiralShape"
    TILTED_CURVY_DROPLET = "TiltedCurvyDroplet"
    TILTED_DROPLET = "TiltedDropletShape"
    PALM_TREE = "PalmTreeShape"
    POTTED_PLANT = "PottedPlant"
    SEAGULL = "Seagull"
    S = "SShape"
    S_CURVE = "SCurve"
    WAVE = "WaveShape"


# The DataItem class represents a single instance of a shape. This may grow in the future
# but currently only contains the tooltip text. 
class DataItem(BaseModel):
    desc: str

# The Cluster class is a Pydantic base model so that we can easily convert it to json.
# It represents a cluster of shapes in the mandala.
# I call it a cluster because it represents a group of shapes that are related to each other and
# are represented by one type of shape. E.g. if we had a dataset of books all the history
# books could be represented by spirals and all the science books by dots. So History is one
# book cluster and Science is another book cluster.
class Cluster(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    clustername: str
    shape: ShapeType
    offset: float
    width: float
    length: Optional[int] = None
    tiltLeft: Optional[bool] = True
    angleStart: Optional[float] = None
    svgAttrs: Optional[dict] = None
    data: List[DataItem]

# The MandalaData class contains the data sent to javascript for drawing the mandala. 
# It should be instantiated and filled in for specific mandalas.
# It uses Pydantic for data validation and serialization.
# The class contains a list of clusters, each represented by the Cluster class.
# Inheriting from pydantic's BaseModel allows us to use model_dump_json to write this
# object to json. 
class MandalaData(BaseModel):
    clusters: List[Cluster] = Field(default_factory=list)
    desc: Optional[str] = None
    offset: Optional[float] = 0
    angleStart: Optional[float] = 0
    i: Optional[int] = None
    c: Optional[int] = None
    view_box: Optional[str] = None

    def add_center_circle(self, radius: int = 15):
        """Adds a center circle cluster to the mandala data."""
        center_cluster = Cluster(
            clustername="center cluster",
            shape=ShapeType.DOT,
            offset=(radius * -1), 
            width=radius * 2,
            length=radius * 2,
            svgAttrs={"stroke": "#666", "stroke-width": 1, "fill": "white"},
            data=[DataItem(desc="Center circle")]
        )
        self.clusters.append(center_cluster)

class CompositeMandalaData(BaseModel):
    mandalas: List[MandalaData] = Field(default_factory=list)
    view_box: Optional[str] = None

# Abstract class to encapsulate all the data we need for a post (aka an article on Mandalavis.com).
# Inheritors (e.g. mandala17.py MandalaPost17) will contain all the data for that post.
class MandalaPost(ABC):
    @property 
    def mandala_num(self):
        return 0
    
    @property
    def title(self):
        return "Default title"

    @property    
    def posted_date_str(self):
        return ""
    
    @property
    def post_text_html(self):
        return ""

    # We make this a cached_property so that it gets built the first time it's called, but
    # not after that.  This allows to run the calculation in the 'view' - app.py instead of 
    # in the template, for example.     
    @functools.cached_property
    def mandala_data_json_str(self):
        raise NotImplementedError("Subclasses must implement the 'mandala_data_json_str' property.")
