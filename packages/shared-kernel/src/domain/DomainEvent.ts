import { Uuid } from "./valueObjects/Uuid";

interface DomainEventProps {
  id?: Uuid;
  name: string;
  dateTime: Date;
  payload: object;
}

export class DomainEvent {
  id: Uuid;
  name: string;
  dateTime: Date;
  payload: object;

  constructor({ id, dateTime, name, payload }: DomainEventProps) {
    this.id = id || Uuid.create();
    (this.name = name), (this.payload = payload);
    this.dateTime = dateTime;
  }
}
