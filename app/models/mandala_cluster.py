from sqlalchemy.orm import Mapped, mapped_column
from app.models.db import Base
from app.src.mandalas.mandaladata import ShapeType, Cluster
from sqlalchemy import Integer, String, Enum
from sqlalchemy.inspection import inspect

class MandalaCluster(Base):
    __tablename__ = 'mandala_clusters'

    id: Mapped[int] = mapped_column(primary_key=True)
    mandalaId: Mapped[int]
    name: Mapped[str]
    shape: Mapped[ShapeType] = mapped_column(Enum(ShapeType, name="shapetype_enum", native_enum=True))
    offset: Mapped[int]
    width: Mapped[int]
    length: Mapped[int]
    stroke: Mapped[str] = mapped_column(nullable=True)
    strokeWidth: Mapped[int] = mapped_column(nullable=True)
    fill: Mapped[str] = mapped_column(nullable=True)
    angleStart: Mapped[int] = mapped_column(nullable=True)
    tiltLeft: Mapped[bool] = mapped_column(nullable=True)
    zindex: Mapped[int] = mapped_column(nullable=True)

    def to_mandaladata_cluster(self, items):
        cluster = Cluster(
            id=self.id,
            clustername=self.name,
            shape=self.shape,
            offset=self.offset,
            width=self.width,
            length=self.length,
            angleStart=self.angleStart,
            tiltLeft=self.tiltLeft,
            svgAttrs={"stroke": self.stroke, "stroke-width": self.strokeWidth, "fill": self.fill},
            data=items,
            zindex=self.zindex if self.zindex is not None else 0
        )
        return cluster
