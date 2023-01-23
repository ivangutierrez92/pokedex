export interface PokemonsResult {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export interface Pokemon {
  name: string;
}

export interface PokemonDetail {
  name: string;
  sprites: {
    front_default: Sprite;
  };
  types: Type[];
  stats: Stat[];
}

interface Sprite {
  front_default: string;
}

interface Type {
  type: {
    name: string;
  };
}

interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}
