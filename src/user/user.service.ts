import { Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { MongoRepository } from "typeorm";
import { User, USER_TABLENAME } from "./user.entity";
import { CreateUserDto, UpdateUserDto } from "./user.dto";
import { Db, ObjectId } from "mongodb";
import { UserVersion } from "./user-version.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: MongoRepository<User>,
    @InjectRepository(UserVersion)
    private readonly userVersionRepository: MongoRepository<UserVersion>,
    @Inject("DATABASE_CONNECTION") private db: Db,
  ) {
    this.captureChangeStream();
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    return this.userRepository.findOneByOrFail({ _id: new ObjectId(id) });
  }

  async create(user: CreateUserDto): Promise<User> {
    return this.userRepository.save(user);
  }

  async update(id: string, user: UpdateUserDto): Promise<User> {
    const result = this.userRepository.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: user },
      { returnDocument: "after" },
    ) as Promise<User>;

    if (!result) {
      throw new Error("Document not found");
    } else {
      return result;
    }
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.findOneAndDelete({ _id: new ObjectId(id) });
  }

  async versions(id: string): Promise<UserVersion[]> {
    return this.userVersionRepository.find({ userId: id });
  }

  captureChangeStream() {
    try {
      const collection = this.db.collection(USER_TABLENAME);
      const changeStream = collection.watch();
      changeStream.on("change", async (change: any) => {
        console.log(change);
        try {
          const document = {
            ...(change.updateDescription || change.fullDocument || {}),
            operation: change.operationType,
          };
          document.userId = change.documentKey._id.toString();
          document.loggedAt = new Date(change.wallTime);
          delete document._id;
          await this.userVersionRepository.save(document);
        } catch (error) {
          console.error(error);
        }
      });

      changeStream.on("error", (error) => {
        console.error(error);
      });
    } catch (err) {
      console.error(err);
    }
  }
}
