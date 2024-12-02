import { createClient, RedisClientType } from "redis";

export class RedisClientSingleton {
  private static instance?: RedisClientType;

  static getInstance(): RedisClientType {
    if (!this.instance) {
      this.instance = createClient({ url: "redis://redis:6379" });
    }
    return this.instance;
  }
}
