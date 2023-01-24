import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/models/Pokemon.model';
import { MatPaginator } from '@angular/material/paginator';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit, AfterViewInit {
  @Input() pokemons: Pokemon[] = [];
  search = '';
  dataSource: MatTableDataSource<Pokemon> = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'details'];
  searchControl = new FormControl('');
  filteredOptions: Observable<Pokemon[]>;
  @Output() detailsClicked = new EventEmitter<string>();
  @Output() searchChanged = new EventEmitter<Event>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.data = this.pokemons;
    this.dataSource.filterPredicate = (data: Pokemon, filter: string) => {
      return data.name.toLowerCase().includes(filter);
    };

    this.filteredOptions = this.searchControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onClickDetails(name: string) {
    this.detailsClicked.emit(name);
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
