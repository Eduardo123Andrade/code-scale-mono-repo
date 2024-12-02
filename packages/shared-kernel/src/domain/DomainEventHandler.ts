import { DomainEvent } from "./DomainEvent";

export type EventSubscribeHandler = (event: DomainEvent) => void;

export interface DomainEventHandler {
  connect(): void;
  disconnect(): void;

  publish(event: Array<DomainEvent>): Promise<void>;
  subscribe(eventName: string, handler: EventSubscribeHandler): Promise<void>;
}
