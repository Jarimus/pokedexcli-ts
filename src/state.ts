import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { PokeAPI } from "./pokeapi.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";

export type State = {
    interface: Interface,
    api: PokeAPI,
    nextLocationsURL: string,
    prevLocationsURL: string,
    commands: Record<string, CLICommand>,
}

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
};

export function initState(): State {
    const REPL = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
    });

    const api = new PokeAPI;

    const commands = {
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
        map: {
            name: "map",
            description: "Display next 20 locations",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Display previous 20 locations",
            callback: commandMapb,
        }
    }

    const state: State = {
        interface: REPL,
        api: api,
        commands: commands,
        nextLocationsURL: "https://pokeapi.co/api/v2/location-area/",
        prevLocationsURL: "",
    }

    return state
}