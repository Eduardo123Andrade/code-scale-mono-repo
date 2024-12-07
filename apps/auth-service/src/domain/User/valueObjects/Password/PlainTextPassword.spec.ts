import { ValueObject } from "@money-manager/shared-kernel/dist";
import { describe, expect, it } from "vitest";
import { HashedPassword } from "./HashedPassword";
import { InvalidPasswordError } from "./InvalidPasswordError";
import { NotStrongPasswordError } from "./NotStrongPasswordError";
import { PlainTextPassword } from "./PlainTextPassword";

describe("src/domain/User/valueObjects/PlainTextPassword", () => {
  it("should be defined", () => {
    expect(PlainTextPassword).toBeDefined();
  });

  it("should be a instance of ValueObject", () => {
    const password = PlainTextPassword.create("Abc@1234");

    expect(password).toBeInstanceOf(ValueObject);
  });

  describe("create", () => {
    it("should throw an error if password is not strong", () => {
      const test = () => {
        PlainTextPassword.create("admin123");
      };

      expect(test).toThrowError(NotStrongPasswordError);
    });

    it("should return a instance of PlainTextPassword", () => {
      const password = PlainTextPassword.create("Abc@1234");

      expect(password).toBeInstanceOf(PlainTextPassword);
    });

    it("should throw an error if password is not a string", () => {
      const test = () => {
        // @ts-expect-error
        PlainTextPassword.create(0);
      };

      expect(test).toThrowError(InvalidPasswordError);
    });

    it("should set the password on de value property", () => {
      const expectedPassword = "Abc@1234";
      const password = PlainTextPassword.create(expectedPassword);

      expect(password.value).toBe(expectedPassword);
    });
  });

  describe("hash", () => {
    it("should return a instance of HashedPassword", async () => {
      const plainTextPassword = PlainTextPassword.create("Abc@1234");
      const hashedPassword = await plainTextPassword.hash();

      expect(hashedPassword).toBeInstanceOf(HashedPassword);
    });
  });
});
