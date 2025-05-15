# Mandaladata.py
# The following code defines a set of classes and enums to represent the data structure for a mandala.
# The code is designed to be used in a web application, specifically for creating and managing mandalas.
# from app.src.mandalas.mandaladata import MandalaData, Cluster, ShapeType, DataItem
# The pydantic library is used for data validation and settings management using Python type annotations
from pydantic import BaseModel
from enum import Enum
from typing import Optional, List
from abc import ABC, abstractmethod
import sys
import os
import importlib.util
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../../../..')))


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
    clustername: str
    shape: ShapeType
    offset: int
    width: int
    length: int
    angleStart: Optional[float] = None
    svgAttrs: Optional[dict] = None
    data: List[DataItem]

# The MandalaData class is the base class. It should be subclassed for specific mandalas.
# It uses Pydantic for data validation and serialization.
# The class contains a list of clusters, each represented by the Cluster class.
# Inheriting from pydantic's BaseModel allows us to use model_dump_json to write this
# object to json. 
class MandalaData(BaseModel):
    clusters: List[Cluster] = []

    # The __init__ method initializes the clusters list.
    def __init__(self, **data):
        super().__init__(**data)
        self.clusters = []

    # The add_cluster method allows adding clusters to the mandala data.
    def add_cluster(self, cluster: Cluster):
        self.clusters.append(cluster)

    def create_mandala_data(self, postid):
        try:
            module_name = f"app.src.mandalas.mandala{postid}"
            base_dir = os.path.dirname(os.path.abspath(__file__))
            file_path = os.path.join(base_dir, f'mandala{postid}.py')
            spec = importlib.util.spec_from_file_location(module_name, file_path)
            module = importlib.util.module_from_spec(spec)
            spec.loader.exec_module(module)
        except ModuleNotFoundError as e:
            print(f"Module not found: {e}")
        except ImportError as e:
            print(f"Import error: {e}")
        except Exception as e:
            print(f"Other error: {e}")
        else:
            createData = module.createData
            self.clusters = createData()
        return self.model_dump_json()

    # This method should be implemented by subclasses (mandalas) to provide specific mandala data
    # @abstractmethod
    # def createMandalaData():
    #     pass
