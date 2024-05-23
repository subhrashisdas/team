import { Module } from "@nestjs/common";
import { Db, MongoClient } from "mongodb";

@Module({
  providers: [
    {
      provide: "DATABASE_CONNECTION",
      useFactory: async (): Promise<Db> => {
        try {
          const client = new MongoClient(process.env.DB_URL);
          return client.db(process.env.DB_NAME);
        } catch (error) {
          throw error;
        }
      },
    },
  ],
  exports: ["DATABASE_CONNECTION"],
})
export class DatabaseModule {}
