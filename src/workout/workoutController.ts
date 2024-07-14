// src/users/usersController.ts
import {
  Body,
  Controller,
  Delete,
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

  @SuccessResponse("204", "No Content")
  @Delete()
  public async deleteWorkout(@Query() id: string): Promise<void> {
    const workoutService = new WorkoutService();
    await workoutService.delete(id);
    this.setStatus(204);
    return;
  }
}
