import bcrypt from "bcrypt";
import { describe, expect, it } from "vitest";
import { ValueObject } from "@money-manager/shared-kernel/dist";
import { HashedPassword } from "./HashedPassword";
import { InvalidPasswordError } from "./InvalidPasswordError";
import { NotStrongPasswordError } from "./NotStrongPasswordError";

describe("src/domain/User/valueObjects/HashedPassword", () => {
  it("should be defined", () => {
    expect(HashedPassword).toBeDefined();
  });

  it("should be a instance of ValueObject", async () => {
    const hashedPassword = await bcrypt.hash("Abc@1234", 10);
    const password = HashedPassword.create(hashedPassword);

    expect(password).toBeInstanceOf(ValueObject);
  });

  describe("create", () => {
    it("should throw an error if password is not strong", () => {
      const test = () => {
        HashedPassword.create("admin123");
      };

      expect(test).toThrowError(InvalidPasswordError);
    });

    it("should throw an error if password length is different than 60", () => {
      const test = () => {
        HashedPassword.create("testPassword");
      };

      expect(test).toThrowError(InvalidPasswordError);
    });

    it("should return a instance of HashedPassword", async () => {
      const hashedPassword = await bcrypt.hash("Abc@1234", 10);
      const password = HashedPassword.create(hashedPassword);

      expect(password).toBeInstanceOf(HashedPassword);
    });

    it("should throw an error if password is not a string", () => {
      const test = () => {
        // @ts-expect-error
        HashedPassword.create(0);
      };

      expect(test).toThrowError(InvalidPasswordError);
    });

    it("should set the password on de value property", async () => {
      const hashedPassword = await bcrypt.hash("Abc@1234", 10);
      const password = HashedPassword.create(hashedPassword);

      expect(password.value).toBe(hashedPassword);
    });
  });

  describe("compare", () => {
    it("should return false if password is not the same", async () => {
      const wrongPassword = "Cde@4321";
      const correctPassword = await bcrypt.hash("Abc@1234", 10);

      const hashedPassword = HashedPassword.create(correctPassword);
      const result = await hashedPassword.compare(wrongPassword);

      expect(result).toBeFalsy();
    });

    it("should return true if password is the same", async () => {
      const expectedPassword = "Abc@1234";
      const correctPassword = await bcrypt.hash(expectedPassword, 10);

      const hashedPassword = HashedPassword.create(correctPassword);
      const result = await hashedPassword.compare(expectedPassword);

      expect(result).toBeTruthy();
    });
  });
});
