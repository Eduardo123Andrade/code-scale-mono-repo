import { describe, expect, it } from "vitest";
import { User } from "./User";
import { AggregateRoot, Uuid } from "@money-manager/shared-kernel/dist";
import { Name } from "../valueObjects/Name/Name";
import { Email } from "../valueObjects/Email/Email";
import { HashedPassword } from "../valueObjects/Password/HashedPassword";

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
    });
    describe("when an id is not passed as parameter", () => {
      it("should generate a new id", () => {
        const user = User.create({ name, email });

        expect(user.id).toBeInstanceOf(Uuid);
      });
    });
  });
});
