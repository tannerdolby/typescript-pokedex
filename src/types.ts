type AbilitiesItem = {
  ability: {
    name: string,
    url: string
  },
  is_hidden: false,
  slot: number,
}

type FormsItem = {
  name: string,
  url: string
}

type GameIndicesItem = {
  game_index: number,
  version: {
    name: string,
    url: string
  }
}

export interface Pokemon {
  abilities: AbilitiesItem[],
  base_experience: number,
  forms: FormsItem[],
  game_indices: GameIndicesItem[],
  height: number,
  held_items: [],
  id: number,
  is_default: boolean,
  location_area_encounters: string,
  moves: [],
  name: string,
  order: number,
  past_types: []
  species: {
    name: string,
    url: string
  },
  sprites: {
    back_default: string | null,
    back_female: string | null,
    back_shiny: string | null,
    back_shiny_female: string | null,
    front_default: string | null,
    front_female: string | null,
    front_shiny: string | null,
    front_shiny_female: string | null
  },
  stats: [],
  types: [],
  weight: number
}

export type PokemonItemFormatted = {
  base_stat: number | string,
  height: number,
  id: number,
  image: string | null,
  name: string,
  stat: string,
  type: string,
  weight: number,
  abilities: string,
}