import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { User } from "./user/user.entity";
import { UserVersion } from "./user/user-version.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mongodb",
      url: process.env.DB_URL,
      database: process.env.DB_NAME,
      entities: [User, UserVersion],
      synchronize: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
