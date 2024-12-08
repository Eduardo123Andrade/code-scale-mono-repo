import { describe, expect, it } from "vitest";
import { UserCreatedEvent } from "./UserCreatedEvent";
import { DomainEvent } from "../DomainEvent";
import { Uuid } from "../valueObjects/Uuid";

describe("src/domain/events/UserCreatedEvent", () => {
  it("should be defined", () => {
    expect(UserCreatedEvent).toBeDefined();
  });

  it("should be a instance of DomainEvent", () => {
    const eventId = Uuid.create();
    const eventDate = new Date();
    const eventPayload = {
      id: Uuid.create().value,
      name: "Sheldon cooper",
      email: "sheldon@gmail.com",
    };

    const event = new UserCreatedEvent(eventId, eventDate, eventPayload);

    expect(event).toBeInstanceOf(DomainEvent);
  });
});
