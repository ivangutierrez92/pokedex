import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Pokemon, PokemonDetail } from 'src/models/Pokemon.model';
import { PokemonsService } from './services/pokemons.service';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  pokemons: Pokemon[] = [];
  pokemonDetail: PokemonDetail | undefined;
  myControl = new FormControl('');
  search = '';
  filteredOptions: Observable<Pokemon[]>;
  dataSource = new MatTableDataSource<Pokemon>();
  displayedColumns: string[] = ['name', 'details'];
  nameCounter: Record<string, number>;

  constructor(private pokemonService: PokemonsService) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

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
      this.nameCounter = this.pokemons.reduce<Record<string, number>>(
        (acc, curr) => {
          let firstLetter = curr.name.toLowerCase()[0];
          acc[firstLetter] ? (acc[firstLetter] += 1) : (acc[firstLetter] = 1);
          return acc;
        },
        {}
      );
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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
