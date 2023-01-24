import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/Pokemon.model';

@Component({
  selector: 'app-count-table',
  templateUrl: './count-table.component.html',
  styleUrls: ['./count-table.component.scss'],
})
export class CountTableComponent implements OnInit {
  @Input() pokemons: Pokemon[] = [];
  dataSource: [string, number][];
  displayedColumns: string[] = ['letter', 'count'];

  ngOnInit() {
    const nameCounterObject = this.pokemons.reduce<Record<string, number>>(
      (acc, curr) => {
        const firstLetter = curr.name.toLowerCase()[0];
        acc[firstLetter] ? (acc[firstLetter] += 1) : (acc[firstLetter] = 1);
        return acc;
      },
      {}
    );
    this.dataSource = Object.entries(nameCounterObject).sort((a, b) =>
      a[0].localeCompare(b[0])
    );
  }
}
