import { State } from "./state.js";

export function handleCommand(state: State, userCmd: string) {
    // Find the command in the commands object
    const command = state.commands[userCmd];
    if (command) {
        // If the command exists, execute its callback
        command.callback(state);
    } else {
        // If the command does not exist, print an error message
        console.log(`Unknown command`);
    }
}

