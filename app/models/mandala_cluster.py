from sqlalchemy.orm import Mapped, mapped_column
from app.models.db import Base
from app.src.mandalas.mandaladata import ShapeType
from sqlalchemy import Integer, String, Enum

class MandalaCluster(Base):
    __tablename__ = 'mandala_clusters'

    id: Mapped[int] = mapped_column(primary_key=True)
    mandalaId: Mapped[int]
    name: Mapped[str]
    shape: Mapped[ShapeType] = mapped_column(Enum(ShapeType, name="shapetype_enum", native_enum=True))
    offset: Mapped[int]
    width: Mapped[int]
    length: Mapped[int]
    angleStart: Mapped[int] = mapped_column(nullable=True)

