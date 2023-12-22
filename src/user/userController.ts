// src/users/usersController.ts
import { Body, Controller, Post, Route, SuccessResponse } from "tsoa";
import { User } from "./user";
import { UserService } from "./userService";

@Route("users")
export class UsersController extends Controller {
  @SuccessResponse("201", "Created")
  @Post()
  public async createUser(@Body() requestBody: User): Promise<User> {
    const userService = new UserService();
    this.setStatus(201);
    return userService.create(requestBody);
  }
}
