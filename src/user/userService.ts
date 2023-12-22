import { db } from "../configs/firebase";
import { User } from "./user";

export class UserService {
  public async create(user: User): Promise<User> {
    const userRef = db.collection("users").doc();

    await userRef.set({
      name: user.name,
      email: user.email,
    });

    return user;
  }
}
