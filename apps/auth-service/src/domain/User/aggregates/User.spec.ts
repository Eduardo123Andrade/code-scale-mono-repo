import {
  AggregateRoot,
  UserCreatedEvent,
  Uuid,
} from "@money-manager/shared-kernel/dist";
import { describe, expect, it } from "vitest";
import { Email } from "../valueObjects/Email/Email";
import { Name } from "../valueObjects/Name/Name";
import { User } from "./User";

describe("src/domain/User/aggregates/User", () => {
  const name = Name.create("Sheldon");
  const email = Email.create("sheldon@gmail.com");
  // const password = HashedPassword.create("Acb@1234");

  it("should be defined", () => {
    expect(User).toBeDefined();
  });

  it("should be a instance of Aggregate", () => {
    const user = User.create({ name, email });

    expect(user).toBeInstanceOf(AggregateRoot);
  });

  describe("create", () => {
    describe("when an id is passed as parameter", () => {
      it("should set the same id on id property", () => {
        const expectedId = Uuid.create();
        const user = User.create({ name, email }, expectedId);

        expect(user.id.value).toBe(expectedId.value);
      });

      it("should not add UserCreatedEvent in the events arrays", () => {
        const expectedId = Uuid.create();
        const user = User.create({ name, email }, expectedId);

        expect(user.events).toStrictEqual([]);
      });
    });

    describe("when an id is not passed as parameter", () => {
      it("should generate a new id", () => {
        const user = User.create({ name, email });

        expect(user.id).toBeInstanceOf(Uuid);
      });

      it("should add UserCreatedEvent in the events arrays", () => {
        const user = User.create({ name, email });

        expect(user.events[0]).toBeInstanceOf(UserCreatedEvent);
      });
    });
  });
});
