import { readFile } from "node:fs/promises";
import { Task, Taskid, TaskRepository } from "../../tasks-cli/src/domain.ts";

interface TaskFileData { tasks: Task[]; }

export class FileTaskRepository implements TaskRepository {
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    async list(): Promise<TaskFileData["tasks"]> {
        try {
            const data = await readFile(this.filePath, { encoding: "utf-8" });
            const fileData = JSON.parse((data), (key, value) => {
                if (key === "createdAt") {
                    return new Date(value);
                }
            }) as TaskFileData;
            return fileData.tasks;
        } catch (error) {
            if (error && (error as { code: string }).code === "ENOENT") {
                console.error("Error reading tasks from file:", error);
                return [];
            }
            throw error;
        }
    }
    
    async add(task: Task): Promise<void> {
        // Implementation to add a task to a JSON file
    }

    async complete(id: Taskid): Promise<void> {
        // Implementation to mark a task as completed in the JSON file
    }
}
