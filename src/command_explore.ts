import { Location  } from "./pokeapi.js";
import { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
    if ( args.length < 2 ) {
        console.log("Provide a location: explore <location>")
        return
    }
    const location = args[1];
    const data = await state.api.fetchLocation(location);
    if (data.pokemon_encounters === undefined) {
      console.log("Locations not found.")
        return
    }
    console.log(`Exploring ${location}...`);
    data.pokemon_encounters.forEach( (pokemon) => {
        console.log(pokemon.pokemon.name)
    } );
}