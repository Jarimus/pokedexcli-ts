export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL: string): Promise<ShallowLocations> {
    const response = await fetch(pageURL);
    return await response.json();
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const response = await fetch(`${PokeAPI.baseURL}/location-area/${locationName}}`)
    return await response.json();
}
}

export type ShallowLocations = {
  count: number,
  next: string,
  previous: string,
  results: Location[],
};

export type Location = {
  areas: [
    {
      name: string,
      url: string
    }
  ],
  id: 1,
  name: string,
  region: {
    name: string,
    url: string
  },
};