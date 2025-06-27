import { CLICommand } from "./commands.js";

export function commandHelp(commands: Record<string, CLICommand>) {
    console.log(`Welcome to the Pokedex!

Usage:`);
    for (const cmd in commands) {
        const cmdObj = commands[cmd];
        console.log(`${cmdObj.name}: ${cmdObj.description}`)
    }
}