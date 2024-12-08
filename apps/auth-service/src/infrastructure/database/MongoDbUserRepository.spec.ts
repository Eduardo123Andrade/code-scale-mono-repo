import { UserRepository } from "./../../domain/repositories/UserRepository";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { MongoDbUserRepository } from "./MongoDbUserRepository";
import { MongoDbClientSingleton } from "@money-manager/shared-kernel/dist";
import { Name } from "../../domain/User/valueObjects/Name/Name";
import { Email } from "../../domain/User/valueObjects/Email/Email";
import { User } from "../../domain/User/aggregates/User";

describe("src/infrastructure/database/MongoDbUserRepository", () => {
  const closeMock = vi.fn();
  const insertOneMock = vi.fn();

  const collectionMock = vi.fn().mockReturnValue({
    insertOne: insertOneMock,
  });

  const dbMock = vi.fn().mockReturnValue({
    collection: collectionMock,
  });

  MongoDbClientSingleton.getInstance = vi.fn().mockReturnValue({
    db: dbMock,
    close: closeMock,
  });

  it("should be defined", () => {
    expect(MongoDbUserRepository).toBeDefined();
  });

  describe("connect", () => {
    const userRepository = new MongoDbUserRepository();

    beforeAll(async () => {
      await userRepository.connect();
    });
    it("should call MongoDbClientSingleton getInstance method", () => {
      expect(MongoDbClientSingleton.getInstance).toHaveBeenCalled();
    });
  });

  describe("disconnect", () => {
    const userRepository = new MongoDbUserRepository();

    beforeAll(async () => {
      await userRepository.connect();
      await userRepository.disconnect();
    });
    it("should call close method", () => {
      expect(closeMock).toHaveBeenCalled();
    });
  });

  describe("create", () => {
    const userRepository = new MongoDbUserRepository();
    const name = Name.create("Sheldon");
    const email = Email.create("sheldon@gmail.com");
    const user = User.create({ name, email });

    beforeAll(async () => {
      await userRepository.connect();
      await userRepository.create(user);
    });
    it("should call insertOne method", () => {
      expect(insertOneMock).toBeCalled();
    });
  });
});
