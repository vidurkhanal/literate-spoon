import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { nanoid } from "nanoid";

@Entity()
export class ShortURL {
  @PrimaryKey({ unique: true })
  _id!: string;

  @Property({ type: "date" })
  createdAt = new Date();

  @Property({ type: "text" })
  longURL!: string;

  @Property({ type: "number" })
  visits = 0;

  @Property({ type: "text" })
  shortURL = nanoid(10);
}
