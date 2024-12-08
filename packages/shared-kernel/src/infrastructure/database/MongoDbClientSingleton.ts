import { MongoClient } from "mongodb";

export class MongoDbClientSingleton {
  private static instance?: MongoClient | null = null;

  static async getInstance(): Promise<MongoClient> {
    if (!this.instance) {
      const connectionString = this.buildConnectionString();
      this.instance = await MongoClient.connect(connectionString);
    }
    return this.instance;
  }

  private static buildConnectionString(): string {
    const { DB_HOST, DB_PORT } = process.env;

    return `mongodb://${DB_HOST}:${DB_PORT}`;
  }
}
