import { RedisClientType } from "redis";
import { DomainEvent } from "../../domain/DomainEvent";
import {
  DomainEventHandler,
  EventSubscribeHandler,
} from "../../domain/DomainEventHandler";
import { RedisClientSingleton } from "./RedisClientSingleton";
import { Uuid } from "../../domain/valueObjects/Uuid";

export class RedisDomainEventHandler implements DomainEventHandler {
  private client: RedisClientType;

  constructor() {
    this.client = RedisClientSingleton.getInstance();
  }

  connect(): Promise<void> {
    return this.client.connect();
  }

  disconnect(): Promise<string> {
    return this.client.quit();
  }

  async publish(events: Array<DomainEvent>): Promise<void> {
    events.forEach((event: DomainEvent) => {
      const { id, name, dateTime, payload } = event;
      const dataString = JSON.stringify({
        id: id.value,
        name,
        dateTime,
        payload,
      });

      this.client.publish(event.name, dataString);
    });
  }

  subscribe(eventName: string, handler: EventSubscribeHandler): Promise<void> {
    return this.client.subscribe(eventName, (data: string) => {
      const { id, name, dateTime, payload } = JSON.parse(data);
      const event = new DomainEvent({
        id: Uuid.create(id),
        name,
        dateTime: new Date(dateTime),
        payload,
      });
      handler(event);
    });
  }
}
