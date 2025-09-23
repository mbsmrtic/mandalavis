from sqlalchemy.orm import Mapped, mapped_column, Session
from sqlalchemy import String, Integer
from sqlalchemy.dialects.postgresql import insert
from app.models.db import Base, db

# class Color(Base): 
#     __tablename__ = 'colors'

#     id: Mapped[int] = mapped_column(primary_key=True)
#     name: Mapped[str] 
#     hex: Mapped[str] = mapped_column(String(7))

class PresetColor(Base):
    __tablename__ = "preset_colors"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    colorname: Mapped[str] = mapped_column(String(64), unique=True, index=True, nullable=False)
    hexval: Mapped[str]   = mapped_column(String(9), nullable=False)  # "#RRGGBBTT" TT=transparency

    def to_dict(self):
        return {"id": self.id, "colorname": self.colorname, "hexval": self.hexval }

DEFAULT_COLORS = [
    ("dove white", (239, 238, 229)),
    ("revere pewter", (203, 198, 184)),
    ("country redwood", (118, 44, 35)),
    ("sheer romance", (154, 180, 199)),
    ("silverbells", (220, 217, 213)),
    ("irises", (132, 137, 154)),
    ("october mist", (182, 184, 165)),
    ("steam", (240, 239, 230)),
    ("venetian portico", (196, 169, 150)),
]

# --- seeding function ---
def seed_colors() -> None:
    values = [{"colorname": n, "hexval": rgba_to_hex(*rgb)} for n, rgb in DEFAULT_COLORS]

    insert_stmt = insert(PresetColor).values(values)
    upsert = insert_stmt.on_conflict_do_update(
        index_elements=[PresetColor.colorname],       # requires UNIQUE on colorname
        set_={"hexval": insert_stmt.excluded.hexval}, # <-- use insert_stmt here
    )

    db.session.execute(upsert)
    db.session.commit()

def rgb_to_hex(r: int, g: int, b: int) -> str:
    """
    Convert RGB values (0–255) to a hex string (#RRGGBB).
    Raises ValueError if values are out of range.
    """
    for val in (r, g, b):
        if not (0 <= val <= 255):
            raise ValueError(f"RGB component {val} out of range (0–255)")
    return "#{:02X}{:02X}{:02X}".format(r, g, b)

def rgba_to_hex(r: int, g: int, b: int, a: float = 1.0) -> str:
    """
    Convert RGBA values to a hex string (#RRGGBBAA).
    Alpha can be 0.0–1.0.
    Alpha = transparency 0 = fully transparent 1 = not at all transparent
    """
    for val in (r, g, b):
        if not (0 <= val <= 255):
            raise ValueError(f"RGB component {val} out of range (0–255)")
    if not (0.0 <= a <= 1.0):
        raise ValueError("Alpha must be between 0.0 and 1.0")
    alpha_int = round(a * 255)
    return "#{:02X}{:02X}{:02X}{:02X}".format(r, g, b, alpha_int)
