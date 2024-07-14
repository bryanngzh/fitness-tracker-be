import { Activity } from "./activity";

export interface Workout {
  name: string;
  date: string;
  duration: string;
  activities: Activity[];
  createdBy: string;
}
