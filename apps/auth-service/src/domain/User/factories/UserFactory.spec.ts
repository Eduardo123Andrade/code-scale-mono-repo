import { describe, expect, it } from "vitest";
import { UserFactory } from "./UserFactory";
import { User } from "../aggregates/User";

describe("src/domain/User/factories/UserFactory", () => {
  it("should be defined", () => {
    expect(UserFactory).toBeDefined();
  });

  describe("createWithPlainTextPassword", () => {
    it("should return a instance of User", async () => {
      const user = await UserFactory.createWithPlainTextPassword({
        name: "Sheldon",
        email: "sheldon@gmail.com",
        password: "Abc@1234",
      });

      expect(user).toBeInstanceOf(User);
    });
  });
});
