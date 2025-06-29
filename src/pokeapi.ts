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
    try {
      const response = await fetch(pageURL);
      const data = await response.json();
      this.cache.add(pageURL, data);
      return data;
    }
    catch (err) {
      return <ShallowLocations>{};
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`
    if ( this.cache.get(url) != undefined ) {
      return this.cache.get(url);
    }
    try {
      const response = await fetch(url)
      const data = await response.json();
      this.cache.add(url, data);
      return data;
    }
    catch (err) {
      return <Location>{};
    }
    
}
}

export type ShallowLocations = {
  count: number,
  next: string,
  previous: string,
  results: Location[],
};

export type Location = {
  encounter_method_rates: Array<{
    encounter_method: {
      name: string
      url: string
    }
    version_details: Array<{
      rate: number
      version: {
        name: string
        url: string
      }
    }>
  }>
  game_index: number
  id: number
  location: {
    name: string
    url: string
  }
  name: string
  names: Array<{
    language: {
      name: string
      url: string
    }
    name: string
  }>
  pokemon_encounters: Array<{
    pokemon: {
      name: string
      url: string
    }
    version_details: Array<{
      encounter_details: Array<{
        chance: number
        condition_values: Array<any>
        max_level: number
        method: {
          name: string
          url: string
        }
        min_level: number
      }>
      max_chance: number
      version: {
        name: string
        url: string
      }
    }>
  }>
}
