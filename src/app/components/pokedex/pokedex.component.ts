import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/models/Pokemon.model';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements AfterViewInit {
  search = '';
  displayedColumns: string[] = ['name', 'details'];
  @Input() dataSource: MatTableDataSource<Pokemon>;
  @Input() myControl = new FormControl('');
  @Input() filteredOptions: Observable<Pokemon[]>;
  @Output() detailsClicked = new EventEmitter<string>();
  @Output() searchChanged = new EventEmitter<Event>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  onClickDetails(name: string) {
    this.detailsClicked.emit(name);
  }
  onSearchChanged(event: Event) {
    this.searchChanged.emit(event);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
