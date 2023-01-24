import { Component, OnInit } from '@angular/core';
import { Pokemon, PokemonDetail } from 'src/app/models/Pokemon.model';
import { PokemonsService } from './services/pokemons.service';
import { Status } from './enums/status.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  pokemons: Pokemon[] = [];
  pokemonDetails: PokemonDetail | undefined;
  detailsMessage = 'Welcome to the Pokedex';
  status: Status = Status.LOADING;

  constructor(private pokemonService: PokemonsService) {}

  ngOnInit() {
    this.pokemonService.getPokemons().subscribe({
      next: (data) => {
        this.pokemons = data.results;
        this.status = Status.SUCCESS;
      },
      error: () => {
        this.status = Status.ERROR;
      },
    });
  }

  openPokemonDetails(name: string) {
    this.pokemonService.getPokemon(name).subscribe({
      next: (data) => {
        this.pokemonDetails = data;
      },
      error: () => {
        this.detailsMessage = 'There was an error retrieving the pokemon';
        this.pokemonDetails = undefined;
      },
    });
  }
}
