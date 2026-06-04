import path from "node:path";
import { readFile, writeFile, rename, unlink } from "node:fs/promises";
import { Task, Taskid, TaskRepository } from "../../tasks-cli/src/domain.ts";

interface TaskFileData { tasks: Task[]; }

export class FileTaskRepository implements TaskRepository {
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    private async saveTasks(tasks: Task[]): Promise<void> {
        let tempPath = path.join(path.dirname(this.filePath), `.${path.basename(this.filePath)}.${Date.now()}.tmp`);
        try {
            const fileData: TaskFileData = { tasks };
            await writeFile(tempPath, JSON.stringify(fileData, null, 2), { encoding: "utf-8" });
            await rename(tempPath, this.filePath);
        } catch (error) {
            try {
                await unlink(tempPath);
            } catch (cleanupError) {
                console.error("Error during cleanup of temp file:", cleanupError);
            }
            console.error("Error saving tasks to file:", error);
            throw error;
        }
    }

    async list(): Promise<TaskFileData["tasks"]> {
        try {
            const data = await readFile(this.filePath, { encoding: "utf-8" });
            const fileData = JSON.parse((data), (key, value) => {
                if (key === "createdAt" && !isNaN(Date.parse(value))) {
                    return new Date(value);
                } return value;
            }) as TaskFileData;
            return fileData.tasks;
        } catch (error) {
            throw error;
        }
    }

    async add(task: Task): Promise<void> {
        try {
            const tasks = await this.list();
            tasks.push(task);
            await this.saveTasks(tasks);
        } catch (error) {
            console.error("Error adding task to file:", error);
            throw error;
        }
    }

    async complete(id: Taskid): Promise<void> {
        try {
            const tasks = await this.list();
            const taskIndex = tasks.findIndex(task => task.id === id);
            if (taskIndex !== -1) {
                tasks[taskIndex].completed = true;
                await this.saveTasks(tasks);
            } else {
                throw new Error(`Task with id ${id} not found`);
            }
        } catch (error) {
            console.error("Error completing task:", error);
            throw error;
        }
    }
}
