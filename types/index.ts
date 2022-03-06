export interface Workout {
  id: 1,
  name: string,
  created_at: Date,
  performed_at: Date,
  exercises: Array<Exercise>,
}

export interface Exercise {
  name: string,
  sets: Array<Set>,
}

export interface Set {
  weight: Number,
  reps: Number,
}
