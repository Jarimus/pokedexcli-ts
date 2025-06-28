import { State } from "./state.js";

export function commandHelp(state: State) {
    const commands = state.commands;
    console.log(`Welcome to the Pokedex!

Usage:`);
    for (const cmd in commands) {
        const cmdObj = commands[cmd];
        console.log(`${cmdObj.name}: ${cmdObj.description}`);
    }
}