from sqlalchemy.orm import Mapped, mapped_column
from app.models.db import Base
from sqlalchemy import Integer, String

class MandalaCluster(Base):
    __tablename__ = 'mandala_clusters'

    id: Mapped[int] = mapped_column(primary_key=True)
    mandalaId: Mapped[int]
    name: Mapped[str]
    offset: Mapped[int]
    width: Mapped[int]
    length: Mapped[int]
    angleStart: Mapped[int] = mapped_column(nullable=True)

