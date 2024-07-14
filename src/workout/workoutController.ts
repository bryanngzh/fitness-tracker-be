// src/users/usersController.ts
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Route,
  SuccessResponse,
} from "tsoa";
import { Workout } from "./workout";
import { WorkoutService } from "./workoutService";

@Route("workout")
export class WorkoutsController extends Controller {
  @Get()
  public async getUser(@Query() email: string): Promise<Workout[] | null> {
    const workoutService = new WorkoutService();
    return workoutService.getAll(email);
  }

  @SuccessResponse("201", "Created")
  @Post()
  public async createWorkout(@Body() requestBody: Workout): Promise<Workout> {
    const workoutService = new WorkoutService();
    this.setStatus(201);
    return workoutService.create(requestBody);
  }
}
