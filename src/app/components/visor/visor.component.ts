import { Component, Input } from '@angular/core';
import { PokemonDetail } from 'src/app/models/Pokemon.model';

@Component({
  selector: 'app-visor',
  templateUrl: './visor.component.html',
  styleUrls: ['./visor.component.scss'],
})
export class VisorComponent {
  @Input() pokemonDetail: PokemonDetail | undefined;
  notFoundImage = './assets/images/not-found.png';

  handleMissingImage(event: Event) {
    (event.target as HTMLImageElement).src = this.notFoundImage;
  }
}
