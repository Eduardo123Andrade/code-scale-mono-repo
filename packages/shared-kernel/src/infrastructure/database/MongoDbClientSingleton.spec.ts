// MongoDbClientSingleton
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";
import { MongoDbClientSingleton } from "./MongoDbClientSingleton";
import { createClient, RedisClientType } from "redis";
import { MongoClient } from "mongodb";

describe("src/infrastructure/events/MongoDbClientSingleton", () => {
  it("should be defined", () => {
    expect(MongoDbClientSingleton).toBeDefined();
  });

  describe("getInstance", () => {
    const expectedInstance = MongoClient.prototype;
    const connectSpy = vi
      .spyOn(MongoClient, "connect")
      .mockResolvedValue(expectedInstance);

    let fistCallInstance: MongoClient;
    let secondCallInstance: MongoClient;

    beforeAll(async () => {
      fistCallInstance = await MongoDbClientSingleton.getInstance();
      secondCallInstance = await MongoDbClientSingleton.getInstance();
    });

    afterAll(() => {
      vi.resetAllMocks();
    });

    describe("when the method is called for the first time", () => {
      beforeAll(async () => {
        fistCallInstance = await MongoDbClientSingleton.getInstance();
      });
      it("should call MongoDb.connect method", () => {
        expect(connectSpy).toHaveBeenCalled();
      });

      it("should return a MongoDbClient", () => {
        expect(fistCallInstance).toStrictEqual(secondCallInstance);
      });
    });

    describe("when the method is called for the second time", () => {
      beforeAll(async () => {
        secondCallInstance = await MongoDbClientSingleton.getInstance();
      });
      it("should not call MongoDb.connect method", () => {
        expect(connectSpy).not.toHaveBeenCalledTimes(2);
        // expect(createClient).not.toHaveBeenCalledTimes(2);
      });

      it("should return the same MongoDbClient instance form the first call", () => {
        // expect(firstCallResult).toStrictEqual(secondCallResult);
        expect(fistCallInstance).toStrictEqual(secondCallInstance);
      });
    });
  });
});
