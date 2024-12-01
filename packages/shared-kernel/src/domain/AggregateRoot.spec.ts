import { describe, expect, it } from "vitest";
import { DomainEvent } from "./DomainEvent";
import { AggregateRoot } from "./AggregateRoot";
import { Uuid } from "./valueObjects/Uuid";
import { Entity } from "./Entity";

interface TestAggregateProps {
  value: string;
}

class TestAggregate extends AggregateRoot<TestAggregateProps> {
  static create(
    props: TestAggregateProps,
    id?: Uuid,
  ): AggregateRoot<TestAggregateProps> {
    return new TestAggregate(props, id);
  }

  get value(): string {
    return this.value;
  }
}

describe("src/domain/Aggregate", () => {
  it("should be defined", () => {
    expect(AggregateRoot).toBeDefined();
  });

  it("should be a instance of Entity", () => {
    const aggregate = TestAggregate.create({ value: "test" });

    expect(aggregate).toBeInstanceOf(Entity);
  });

  describe("addDomainEvent", () => {
    it("should add a domain event to the aggregate events array", () => {
      const aggregate = TestAggregate.create({ value: "test" });

      const event = new DomainEvent({
        name: "EventTest",
        dateTime: new Date(),
        payload: { value: "test" },
      });

      aggregate.addDomainEvent(event);

      expect(aggregate.events).toStrictEqual([event]);
    });
  });
});
