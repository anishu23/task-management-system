export enum TaskStatus {
  TO_DO = 1,
  IN_PROGRESS = 2,
  DONE = 3,
}

export interface Task {
  id?: string;
  title: string;
  status: TaskStatus;
  assigneeId?: string;
  creatorId?: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  priority?: number;
}
