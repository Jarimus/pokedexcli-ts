import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";

export type CLICommand = {
    name: string;
    description: string;
    callback: (commands: Record<string, CLICommand>) => void;
};

export function handleCommand(userCmd: string) {
    const commands = getCommands();

    // Find the command in the commands object
    const command = commands[userCmd];
    if (command) {
        // If the command exists, execute its callback
        command.callback(commands);
    } else {
        // If the command does not exist, print an error message
        console.log(`Unknown command`);
    }
}

export function getCommands(): Record<string, CLICommand> {
    return {
        exit: {
            name: "exit",
            description: "Exit the pokedex",
            callback: commandExit,
        },
        help: {
            name: "help",
            description: "Display a help message",
            callback: commandHelp,
        },
    }
}