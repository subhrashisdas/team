import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { DatabaseModule } from "src/database.module";
import { UserVersion } from "./user-version.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User, UserVersion]), DatabaseModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
