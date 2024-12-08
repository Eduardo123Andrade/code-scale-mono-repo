import { beforeAll, describe, expect, it, vi } from "vitest";
import { CreateUserService } from "./CreateUserService";
import {
  AggregateRoot,
  UserCreatedEvent,
  Uuid,
} from "@money-manager/shared-kernel/dist";
import { HashedPassword } from "../valueObjects/Password/HashedPassword";
import { Name } from "../../domain/User/valueObjects/Name/Name";
import { Email } from "../../domain/User/valueObjects/Email/Email";
import { TestUserRepository } from "./mocks/TestUserRepository.mock";
import { TestDomainEventHandler } from "./mocks/TestDoaminEventHandler.mock";
import { CreateUserResponseDto } from "./CreateUserDto";
import { User } from "../../domain/User/aggregates/User";
import { UserFactory } from "../../domain/User/factories/UserFactory";

describe("src/application/CreateUser/CreateUserService", () => {
  it("should be defined", () => {
    expect(CreateUserService).toBeDefined();
  });

  describe("execute", () => {
    let createUserSpy: unknown;
    let publishCreatedUserSpy: unknown;
    let factorySpy: unknown;

    let result: CreateUserResponseDto;
    let expectedUser: User;

    const name = "Sheldon";
    const email = "sheldon@gmail.com";
    const password = "Abc@1234";

    const userRepository = new TestUserRepository();
    const eventHandler = new TestDomainEventHandler();

    beforeAll(async () => {
      expectedUser = await UserFactory.createWithPlainTextPassword({
        name,
        email,
        password,
      });
      createUserSpy = vi.spyOn(userRepository, "create");
      publishCreatedUserSpy = vi.spyOn(eventHandler, "publish");
      factorySpy = vi
        .spyOn(UserFactory, "createWithPlainTextPassword")
        .mockResolvedValue(expectedUser);

      const createdUserService = new CreateUserService(
        userRepository,
        eventHandler,
      );
      result = await createdUserService.execute({
        name,
        email,
        password,
      });
    });

    it("should call create method from UserRepository", () => {
      expect(createUserSpy).toHaveBeenCalledWith(expectedUser);
    });
    it("should call publish method from DomainEventHandler", () => {
      expect(publishCreatedUserSpy).toHaveBeenCalledWith(expectedUser.events);
    });

    it("should return User data with id", () => {
      expect(result).toStrictEqual({
        id: expectedUser.id.value,
        name,
        email,
      });
    });
  });
});
