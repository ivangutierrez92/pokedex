import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonDetail, PokemonsResult } from 'src/models/Pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  urlApi = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemons() {
    return this.http.get<PokemonsResult>(`${this.urlApi}?limit=20&offset=0`);
  }

  getPokemon(name: string) {
    return this.http.get<PokemonDetail>(`${this.urlApi}/${name}`);
  }
}
