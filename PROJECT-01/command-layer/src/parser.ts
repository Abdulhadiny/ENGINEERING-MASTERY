import { FileTaskRepository } from "../../persistence-layer/src/json-repo";
import { Command, AddCommand, ListCommand, CompleteCommand } from "./command";

export function parseArgs(repo: FileTaskRepository, args: string[]): Command | null {
    const commandName = args[2];
    switch (commandName) {
        case "list":
            return new ListCommand(repo);
        case "add":
            if (args.length < 4) {
                console.error("Error: 'add' command requires a task title.");
                return null;
            }
            return new AddCommand(repo, args.slice(3).join(" "));
        case "complete":
            if (args.length < 4) {
                console.error("Error: 'complete' command requires a task ID.");
                return null;
            }
            return new CompleteCommand(repo, args[3]);
        default:
            return null;
    }
}