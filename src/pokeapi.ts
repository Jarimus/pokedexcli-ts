import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  cache: Cache;

  constructor() {
    this.cache = new Cache(10_000);
  }

  async fetchLocations(pageURL: string): Promise<ShallowLocations> {
    if ( this.cache.get(pageURL) != undefined ) {
      return this.cache.get(pageURL);
    }
    const response = await fetch(pageURL);
    const data = await response.json();
    this.cache.add(pageURL, data);
    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}}`
    if ( this.cache.get(url) != undefined ) {
      return this.cache.get(url);
    }
    const response = await fetch(url)
    const data = await response.json();
    this.cache.add(url, data);
    return data;
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