export interface IExercise {
  id?: string;
  exercise_name?: string;
  video_url?: string;
  preview_base64?: string;
  is_verified?: boolean;
  deleted?: number;
  create_at?: Date;
  update_at?: Date;
}
