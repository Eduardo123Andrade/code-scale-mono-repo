import {
  DomainEvent,
  DomainEventHandler,
  EventSubscribeHandler,
} from "@money-manager/shared-kernel/dist";

export class TestDomainEventHandler implements DomainEventHandler {
  private readonly events: DomainEvent[] = [];

  connect(): void {
    console.log("Connected");
  }

  disconnect(): void {
    console.log("Disconnected");
  }

  async publish(event: Array<DomainEvent>): Promise<void> {
    return await new Promise((resolve) => {
      this.events.push(...this.events);
      resolve();
    });
  }

  async subscribe(
    eventName: string,
    handler: EventSubscribeHandler,
  ): Promise<void> {
    const result = this.events.find((event) => event.name === eventName);

    if (result) [await handler(result)];
  }
}
