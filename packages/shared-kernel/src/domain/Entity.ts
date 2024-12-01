import { ValueObject } from "./ValueObject";
import { Uuid } from "./valueObjects/Uuid";

export class Entity<T> extends ValueObject<T> {
  id: Uuid;

  protected constructor(props: T, id?: Uuid) {
    super(props);
    this.id = id || Uuid.create();
  }
}
