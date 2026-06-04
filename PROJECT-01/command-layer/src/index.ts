import { FileTaskRepository } from "../../persistence-layer/src/json-repo.ts";
import { parseArgs } from "./parser.ts";


// 1. Initialize repository
const repo = new FileTaskRepository("./db.json");

// 2. Check arguments
const command = parseArgs(repo, process.argv);

// 3. Call the command
if (command) {
    try {
        await command.execute();
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error executing command:", error);
        }
        process.exit(1);
    }
} else {
    console.log("Help: node index.js <command> [args]");
}