import { handleCommand } from "./commands.js";
import { State } from "./state.js";

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

export function startREPL(state: State) {

    state.interface.prompt();
    state.interface.on("line", async (line) => {
        // Clean user input
        const args = cleanInput(line);

        // If the input is not empty, grab the command
        if (args.length > 0) {
            await handleCommand(state, args);
        }

        state.interface.prompt();
    })
}

