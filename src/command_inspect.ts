import { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]) {
    // Check for additional argument for the pokemon to inspect
    if (args.length < 2) {
        console.log("Usage: inspect <pokemon>")
        return
    }

    // Check whether the pokemon is caught or not
    const pokemon = args[1];
    const pokemonData = state.pokeDex[pokemon];
    if (pokemonData === undefined) {
        console.log(`You have not yet caught ${pokemon}`);
        return
    }

    // Display info about the pokemon
    console.log(`Name: ${pokemonData.name}
Height: ${pokemonData.height}
Weight: ${pokemonData.weight}`);

    console.log("Stats:");
    pokemonData.stats.forEach( (stat) => console.log(`  - ${stat.stat.name}: ${stat.base_stat}`))
    console.log("Types:");
    pokemonData.types.forEach( (type) => console.log(`  - ${type.type.name}`))
}