import { Task, Taskid, TaskRepository } from "./domain.ts";

// In-memory implementation of the TaskRepository interface
export class InMemoryTaskRepository implements TaskRepository {
    private tasks = new Map<Taskid, Task>();

    async add(task: Task) {
        this.tasks.set(task.id, task);
    }

    async list(): Promise<Task[]> {
        return Array.from(this.tasks.values());
    }

    async complete(id: Taskid): Promise<void> {
        const task = this.tasks.get(id);
        if (!task) {
            throw new Error(`Task with id ${id} not found`);
        }
        task.completed = true;
    }
}