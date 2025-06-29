import { State } from "./state.js";

export async function commandMapb(state: State): Promise<void> {
    const url = state.prevLocationsURL;
    if (url === "") {
        console.log("You're on the first page.")
        return
    }
    const data = await state.api.fetchLocations(url);
    state.nextLocationsURL = data.next;
    if (data.previous === null) {
        state.prevLocationsURL = "";
    } else {
        state.prevLocationsURL = data.previous;
    }

    // List locations
    const locations = data.results;
    locations.forEach( location => console.log(location.name) );
}