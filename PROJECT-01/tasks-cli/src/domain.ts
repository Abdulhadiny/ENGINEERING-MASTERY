// Domain models and repository interface for the task management application
export type Taskid = string;

// Task entity definition
export interface Task {
    id: Taskid;
    title: string;
    completed: boolean;
    createdAt: Date;
}

// Repository interface for managing tasks
export interface TaskRepository {
    add(task: Task): Promise<void>;
    list(): Promise<Task[]>;
    complete(id: Taskid): Promise<void>;
}