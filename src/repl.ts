import { createInterface } from "readline";
import { handleCommand } from "./commands.js";

export function cleanInput(s: string): string[] {
    const words = s.toLowerCase().trim().split(" ");
    const result = []
    for (const i in words) {
        if (words[i].length > 0) {
            result.push(words[i].trim());
        }
    }
    return result;
}



export function startREPL() {
    const REPL = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    REPL.prompt();
    REPL.on("line", (line) => {
        // Clean user input
        const cleanLine = cleanInput(line);

        // If the input is not empty, grab the command
        if (cleanLine.length > 0) {
            const command: string = cleanLine[0];
            handleCommand(command);
        }

        REPL.prompt();

    }).on("close", () => {
        console.log("Exiting REPL.");
        process.exit(0);
    })
}

