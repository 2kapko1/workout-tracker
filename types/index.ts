export interface Workout {
  id: number | null,
  name: string,
  created_at: string,
  performed_at: string | null,
  exercises: WorkoutExercise[],
}

export interface WorkoutExercise {
  exercise: Exercise,
  sets: Set[],
}

export interface Exercise {
  id: number,
  name: string,
}

export interface Set {
  weight: number | null,
  reps: number | null,
}
