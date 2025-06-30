import { createInterface, type Interface } from "readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { PokeAPI } from "./pokeapi.js";
import { commandMap } from "./command_map.js";
import { commandMapb } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch, Pokemon } from "./command_catch.js";
import { stringify } from "querystring";

export type State = {
    interface: Interface,
    api: PokeAPI,
    nextLocationsURL: string,
    prevLocationsURL: string,
    commands: Record<string, CLICommand>,
    pokeDex: Record<string, Pokemon>,
}

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
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
        },
        explore: {
            name: "explore",
            description: "Display pokemon at location. Usage: explore <location>",
            callback: commandExplore,
        },
        catch: {
            name: "catch",
            description: "Attempt to catch a pokemon. Usage: catch <pokemon>",
            callback: commandCatch,
        },
    }

    const state: State = {
        interface: REPL,
        api: api,
        commands: commands,
        nextLocationsURL: "https://pokeapi.co/api/v2/location-area/",
        prevLocationsURL: "",
        pokeDex: {},
    }

    return state
}