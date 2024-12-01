import { describe, expect, it } from "vitest";
import { DomainEvent } from "./DomainEvent";
import { Uuid } from "./valueObjects/Uuid";

const BASE_PROPS = {
  name: "EventTest",
  dateTime: new Date(),
  payload: { test: "event" },
};

describe("src/domain/DomainEvent", () => {
  it("should be defined", () => {
    expect(DomainEvent).toBeDefined();
  });

  describe("constructor", () => {
    it("should generate a new id if none is provided", () => {
      const event = new DomainEvent(BASE_PROPS);

      expect(event.id).toBeDefined();
    });

    it("should set the id if is provided", () => {
      const expectId = Uuid.create();

      const event = new DomainEvent({ ...BASE_PROPS, id: expectId });

      expect(event.id.value).toBe(expectId.value);
    });

    it("should set an event name", () => {
      const expectedName = "EventTest";
      const event = new DomainEvent({ ...BASE_PROPS, name: expectedName });

      expect(event.name).toBe(expectedName);
    });

    it("should set an event date time", () => {
      const expectedDateTime = new Date();
      const event = new DomainEvent({
        ...BASE_PROPS,
        dateTime: expectedDateTime,
      });

      expect(event.dateTime).toBe(expectedDateTime);
    });

    it("should set an event payload", () => {
      const expectedPayload = { test: "event" };
      const event = new DomainEvent({
        ...BASE_PROPS,
        payload: expectedPayload,
      });

      expect(event.payload).toStrictEqual(expectedPayload);
    });
  });
});
