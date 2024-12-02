import { DomainEvent } from "./../../domain/DomainEvent";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { RedisDomainEventHandler } from "./RedisDomainEventHandler";
import { createClient, RedisClientType } from "redis";
import { RedisClientSingleton } from "./RedisClientSingleton";
import { subscribe } from "diagnostics_channel";
import { EventSubscribeHandler } from "../../domain/DomainEventHandler";

const eventHandlers: Record<string, Function> = {};

vi.mock("./RedisClientSingleton", () => {
  const instance = vi.fn(() => ({
    connect: vi.fn(),
    quit: vi.fn(),
    publish: vi.fn(),
    subscribe: vi.fn((eventName: string, handler: Function) => {
      eventHandlers[eventName] = handler;
    }),
  }));

  const RedisClientSingleton = {
    getInstance: instance,
  };

  return { RedisClientSingleton };
});

describe("src/infrastructure/events/RedisDomainEventHandler", () => {
  it("should be defined", () => {
    expect(RedisDomainEventHandler).toBeDefined();
  });

  describe("constructor", () => {
    it("should call getInstance method from RedisClientSingleton", () => {
      new RedisDomainEventHandler();

      expect(RedisClientSingleton.getInstance).toBeCalled();
    });
  });

  describe("connect", () => {
    it("should call redis connect method", () => {
      const handler = new RedisDomainEventHandler();

      handler.connect();

      expect(handler["client"].connect).toBeCalled();
    });
  });

  describe("disconnect", () => {
    it("should call redis quit method", () => {
      const handler = new RedisDomainEventHandler();

      handler.disconnect();

      expect(handler["client"].quit).toHaveBeenCalled();
    });
  });

  describe("publish", () => {
    const eventA = new DomainEvent({
      name: "EventA",
      dateTime: new Date(),
      payload: { value: "testA" },
    });

    const eventB = new DomainEvent({
      name: "EventB",
      dateTime: new Date(),
      payload: { value: "testB" },
    });

    const handler = new RedisDomainEventHandler();
    beforeAll(async () => {
      await handler.publish([eventA, eventB]);
    });

    it("should call redis publish method for the first event on the array", () => {
      const { id, name, dateTime, payload } = eventA;
      const dataStringA = JSON.stringify({
        id: id.value,
        name,
        dateTime,
        payload,
      });

      expect(handler["client"].publish).toHaveBeenCalledWith(
        eventA.name,
        dataStringA,
      );
    });

    it("should call redis publish method for the second event on the array", () => {
      const { id, name, dateTime, payload } = eventB;
      const dataStringB = JSON.stringify({
        id: id.value,
        name,
        dateTime,
        payload,
      });

      expect(handler["client"].publish).toHaveBeenCalledWith(
        eventB.name,
        dataStringB,
      );
    });
  });

  describe("subscribe", () => {
    const event = new DomainEvent({
      name: "EventA",
      dateTime: new Date(),
      payload: { value: "testA" },
    });

    const handler = new RedisDomainEventHandler();
    const eventHandlerFunction: EventSubscribeHandler = vi.fn(
      (event: DomainEvent) => {
        console.log(`Event called: ${event.name}`);
      },
    );

    beforeAll(async () => {
      await handler.subscribe(event.name, eventHandlerFunction);
    });

    it("should call redis publish method for the first event on the array", () => {
      expect(handler["client"].subscribe).toHaveBeenCalledWith(
        event.name,
        expect.any(Function),
      );
    });

    it("should call handler function with the same event", async () => {
      const { id, name, dateTime, payload } = event;
      const dataEvent = JSON.stringify({
        id: id.value,
        name,
        dateTime,
        payload,
      });

      await eventHandlers[event.name](dataEvent);
      expect(eventHandlerFunction).toBeCalledWith(event);
    });
  });
});
