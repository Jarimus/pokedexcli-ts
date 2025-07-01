import { stat } from "fs";
import { State } from "./state";

export async function commandPokedex(state: State) {
    if ( Object.keys(state.pokeDex).length === 0 ) {
        console.log("You have not caught any pokemon.");
        return
    }

    console.log("Your Pokedex:");
    for ( const key in state.pokeDex ) {
        const pokemon = state.pokeDex[key];
        console.log(`  - ${pokemon.name}`);
    }
}