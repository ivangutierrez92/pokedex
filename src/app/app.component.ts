import { Component, OnInit } from '@angular/core';
import { Pokemon, PokemonDetail } from 'src/app/models/Pokemon.model';
import { PokemonsService } from './services/pokemons.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  pokemons: Pokemon[] = [];
  pokemonDetail: PokemonDetail | undefined;
  myControl = new FormControl('');
  filteredOptions: Observable<Pokemon[]>;
  dataSource = new MatTableDataSource<Pokemon>();
  countDisplayedColumns: string[] = ['letter', 'count'];
  nameCounter: [string, number][];

  constructor(private pokemonService: PokemonsService) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
    this.pokemonService.getPokemons().subscribe((data) => {
      this.pokemons = data.results;
      this.dataSource.data = this.pokemons;
      this.dataSource.filterPredicate = (data: Pokemon, filter: string) => {
        return data.name.toLowerCase().includes(filter);
      };
      const nameCounterObject = this.pokemons.reduce<Record<string, number>>(
        (acc, curr) => {
          let firstLetter = curr.name.toLowerCase()[0];
          acc[firstLetter] ? (acc[firstLetter] += 1) : (acc[firstLetter] = 1);
          return acc;
        },
        {}
      );
      this.nameCounter = Object.entries(nameCounterObject).sort((a, b) =>
        a[0].localeCompare(b[0])
      );
    });
  }

  openPokemonDetail(name: string) {
    this.pokemonService.getPokemon(name).subscribe((data) => {
      this.pokemonDetail = data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private _filter(value: string): Pokemon[] {
    const filterValue = value.toLowerCase();

    return this.pokemons.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
}
