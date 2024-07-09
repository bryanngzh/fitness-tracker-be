import { db } from "../configs/firebase";
import { Workout } from "./workout";

export class WorkoutService {
  public async getAll(userEmail: string): Promise<Workout[] | null> {
    const workoutSnapshot = await db
      .collection("workouts")
      .where("createdBy", "==", userEmail)
      .get();

    if (workoutSnapshot.empty) {
      return null;
    }

    const workouts: Workout[] = [];

    workoutSnapshot.docs.forEach((workoutSnapshot: any) => {
      const workoutDoc = workoutSnapshot.data();
      const workout: Workout = {
        name: workoutDoc.name,
        date: workoutDoc.date,
        duration: workoutDoc.duration,
        activities: workoutDoc.activities,
        createdBy: workoutDoc.createdBy,
      };
      workouts.push(workout);
    });
    return workouts;
  }

  public async create(workout: Workout): Promise<Workout> {
    const workoutRef = db.collection("workouts").doc();

    await workoutRef.set({
      name: workout.name,
      date: workout.date,
      duration: workout.duration,
      activities: workout.activities,
      createdBy: workout.createdBy,
    });

    return workout;
  }
}
