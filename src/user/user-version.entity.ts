import { UserRole } from "./user.entity";
import { Column, Entity, Index, ObjectId, ObjectIdColumn } from "typeorm";

export enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
}

export const USER_VERSIONS_TABLENAME = "user_versions";

@Entity({ name: USER_VERSIONS_TABLENAME })
export class UserVersion {
  @ObjectIdColumn()
  id: ObjectId;

  @Index()
  @Column({ nullable: false })
  userId: string;

  @Column({ nullable: false })
  operation: OperationType;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  role: UserRole;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({ nullable: false })
  loggedAt: Date;
}
