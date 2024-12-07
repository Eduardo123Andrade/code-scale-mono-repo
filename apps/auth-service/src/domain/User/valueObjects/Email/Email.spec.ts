import { describe, expect, it } from "vitest";
import { ValueObject } from "@money-manager/shared-kernel/dist";
import { Email } from "./Email";
import { InvalidEmailError } from "./InvalidEmailError";

describe("src/domain/User/valueObjects/Email", () => {
  it("should be defined", () => {
    expect(Email).toBeDefined();
  });

  it("should be a instance of ValueObject", () => {
    const email = Email.create("sheldon@gmail.com");

    expect(email).toBeInstanceOf(ValueObject);
  });

  describe("create", () => {
    it("should throw an error if email is invalid", () => {
      const test = () => {
        Email.create("sheldon-copper");
      };

      expect(test).toThrowError(InvalidEmailError);
    });

    it("should return a instance of Email", () => {
      const email = Email.create("sheldon@gmail.com");

      expect(email).toBeInstanceOf(Email);
    });

    it("should throw an error if email is not a string", () => {
      const test = () => {
        // @ts-expect-error
        Email.create(0);
      };

      expect(test).toThrowError(InvalidEmailError);
    });

    it("should set the email on de value property", () => {
      const expectedEmail = "sheldon@gmail.com";
      const email = Email.create(expectedEmail);

      expect(email.value).toBe(expectedEmail);
    });
  });
});
