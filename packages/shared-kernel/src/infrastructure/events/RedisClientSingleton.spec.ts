import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { RedisClientSingleton } from "./RedisClientSingleton";
import { createClient, RedisClientType } from "redis";

vi.mock("redis", () => {
  return {
    createClient: vi.fn(() => {
      return { fake: "instance" };
    }),
  };
});

describe("src/infrastructure/events/RedisClientSingleton", () => {
  it("should be defined", () => {
    expect(RedisClientSingleton).toBeDefined();
  });

  describe("getInstance", () => {
    let firstCallResult: RedisClientType;
    let secondCallResult: RedisClientType;

    beforeAll(() => {
      firstCallResult = RedisClientSingleton.getInstance();
      secondCallResult = RedisClientSingleton.getInstance();
    });

    afterAll(() => {
      vi.resetAllMocks();
    });

    describe("when the method is called for the first time", () => {
      it("should call createClient method from redis", () => {
        expect(createClient).toHaveBeenCalledTimes(1);
      });

      it("should return a redis client instance", () => {
        expect(firstCallResult).toBeDefined();
      });
    });

    describe("when the method is called for the second time", () => {
      it("should not call createClient method from redis", () => {
        expect(createClient).not.toHaveBeenCalledTimes(2);
      });

      it("should return the same redis client instance form the first call", () => {
        expect(firstCallResult).toStrictEqual(secondCallResult);
      });
    });
  });
});
