from sqlalchemy.orm import Mapped, mapped_column
from app.models.db import Base

class MandalaItem(Base):
    __tablename__ = 'mandala_items'

    id: Mapped[int] = mapped_column(primary_key=True)
    desc: Mapped[str]
    