import { DomainEvent } from "./DomainEvent";
import { Entity } from "./Entity";
import { Uuid } from "./valueObjects/Uuid";

export class AggregateRoot<T> extends Entity<T> {
  events: Array<DomainEvent>;

  protected constructor(props: T, id?: Uuid) {
    super(props, id);
    this.events = [];
  }

  addDomainEvent(event: DomainEvent): void {
    this.events.push(event);
  }
}
