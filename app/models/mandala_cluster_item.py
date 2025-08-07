from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import ForeignKey
from app.models.db import Base
from .mandala_cluster import MandalaCluster
from .mandala_item import MandalaItem


class MandalaClusterItem(Base):
    __tablename__ = 'mandala_cluster_items'

    id: Mapped[int] = mapped_column(primary_key=True)
    clusterId: Mapped[int] = mapped_column("cluster_id", ForeignKey("mandala_clusters.id"))
    itemId: Mapped[int] = mapped_column("item_id", ForeignKey("mandala_items.id"))

