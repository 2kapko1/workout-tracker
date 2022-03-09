export interface Workout {
  id: 1,
  name: string,
  created_at: string,
  performed_at: string,
  exercises: Array<Exercise>,
}

export interface Exercise {
  name: string,
  sets: Array<Set>,
}

export interface Set {
  weight: Number|null,
  reps: Number|null,
}
