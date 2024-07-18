import { db } from "../configs/firebase";
import { Workout } from "./workout";

export class WorkoutService {
  public async getAll(userEmail: string): Promise<any | null> {
    const workoutSnapshot = await db
      .collection("workouts")
      .where("createdBy", "==", userEmail)
      .get();

    if (workoutSnapshot.empty) {
      return null;
    }

    const workouts: Workout[] = [];
    const currentDate = new Date();
    let streak = 0;
    let distance = 0;
    let gym = 0;

    workoutSnapshot.docs.forEach((workoutSnapshot: any) => {
      const workoutDoc = workoutSnapshot.data();
      const workout: Workout = {
        id: workoutSnapshot.id,
        name: workoutDoc.name,
        date: workoutDoc.date,
        duration: workoutDoc.duration,
        activities: workoutDoc.activities,
        createdBy: workoutDoc.createdBy,
      };
      const date = new Date(workout.date);
      if (date.getMonth() === currentDate.getMonth()) {
        streak += 1;
      }
      let isGym = false;
      workout.activities.map((activity) => {
        if (!isGym && activity.type == "Gym") {
          isGym = true;
        } else if (activity.type == "Running" && activity.distance) {
          distance += Number(activity.distance);
        }
      });
      if (isGym) {
        gym += 1;
      }
      workouts.push(workout);
    });

    return {
      sessions: workouts.length,
      streak,
      distance,
      gym,
      workouts: workouts,
    };
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

  public async delete(id: string): Promise<void> {
    await db.collection("workouts").doc(id).delete();
  }
}
