import { Activity } from "./activity";

export interface Workout {
  id?: string;
  name: string;
  date: string;
  duration: string;
  activities: Activity[];
  createdBy: string;
}
