import dotenv from "dotenv";

dotenv.config();

class Config {
  public DATABASE_URL: string | undefined;
  public JWT_SECRET: string | undefined;
  public NODE_ENV: string | undefined;
  public SERVER_PORT: string | undefined;

  constructor() {
    this.DATABASE_URL =
      process.env.DATABASE_URL || "mongodb://localhost:27017/recipe-database";
    this.JWT_SECRET = process.env.JWT_SECRET || "";
    this.NODE_ENV = process.env.NODE_ENV || "development";
    this.SERVER_PORT = process.env.SERVER_PORT || "5321";
  }

  public validateConfig(): void {
    for (const [key, value] of Object.entries(this)) {
      if (value === undefined) {
        throw new Error(`Configuration ${key} is undefined.`);
      }
    }
  }
}

export const config: Config = new Config();
