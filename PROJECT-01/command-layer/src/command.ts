import crypto from "node:crypto";
import { FileTaskRepository } from "../../persistence-layer/src/json-repo.ts";
import { Task } from "../../tasks-cli/src/domain.ts";


// command interface
export interface Command {
    execute(): Promise<void>;
}

// concrete command for listing tasks
export class ListCommand implements Command {
    private repo: FileTaskRepository;

    constructor(repo: FileTaskRepository) {
        this.repo = repo;
    }

    async execute(): Promise<void> {
        const tasks = await this.repo.list();
        if (tasks.length === 0) {
            console.log("No tasks found.");
        } else {
            tasks.forEach(task => console.log(`- [${task.completed ? "x" : " "}] ${task.title} (created at: ${task.createdAt.toISOString()})`));
        }
    }
}

// concrete command for adding a task
export class AddCommand implements Command {
    private repo: FileTaskRepository;
    private title: string;

    constructor(repo: FileTaskRepository, title: string) {
        this.repo = repo;
        this.title = title;
    }

    async execute(): Promise<void> {
        try {
            const newTask: Task = {
                id: crypto.randomUUID(),
                title: this.title,
                completed: false,
                createdAt: new Date()
            };
            await this.repo.add(newTask);
        } catch (error) {
            console.error("Error executing AddCommand:", error);
            return Promise.reject(error);
        }
    }
}

// concrete command for completing a task
export class CompleteCommand implements Command {
    private repo: FileTaskRepository;
    private id: string;

    constructor(repo: FileTaskRepository, id: string) {
        this.repo = repo;
        this.id = id;
    }

    async execute(): Promise<void> {
        await this.repo.complete(this.id);
    }
}