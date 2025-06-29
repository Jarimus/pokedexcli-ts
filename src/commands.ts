import { State } from "./state.js";

export async function handleCommand(state: State, args: string[]) {
    // Find the command in the commands object
    const command = state.commands[args[0]];
    if (command) {
        // If the command exists, execute its callback
        await command.callback(state, ...args);
    } else {
        // If the command does not exist, print an error message
        console.log(`Unknown command`);
    }
}

