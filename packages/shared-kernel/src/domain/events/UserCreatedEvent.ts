import { DomainEvent } from "../DomainEvent";
import { Uuid } from "../valueObjects/Uuid";

interface UserCreatedEventPayload {
  id: string;
  name: string;
  email: string;
}

export class UserCreatedEvent extends DomainEvent {
  constructor(id: Uuid, dateTime: Date, payload: UserCreatedEventPayload) {
    super({ id, dateTime, payload, name: "UserCreatedEvent" });
  }
}
