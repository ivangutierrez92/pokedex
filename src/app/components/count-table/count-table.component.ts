import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-count-table',
  templateUrl: './count-table.component.html',
  styleUrls: ['./count-table.component.scss']
})
export class CountTableComponent {
@Input() dataSource: [string, number][] = [];
displayedColumns: string[] = ['letter', 'count'];
}
