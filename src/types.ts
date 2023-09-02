type AbilitiesItem = {
  ability: {
    name: String,
    url: String
  },
  is_hidden: false,
  slot: 1
}

type FormsItem = {
  name: String,
  url: String
}

type GameIndicesItem = {
  game_index: 153
  version: {
    name: String,
    url: String
  }
}

export interface Pokemon {
  abilities: AbilitiesItem[],
  base_experience: Number,
  forms: FormsItem[],
  game_indices: GameIndicesItem[],
  height: Number,
  held_items: [],
  id: Number,
  is_default: Boolean,
  location_area_encounters: String,
  moves: [],
  name: String,
  order: Number,
  past_types: []
  species: {
    name: String,
    url: String
  },
  sprites: {
    back_default: String | null,
    back_female: String | null,
    back_shiny: String | null,
    back_shiny_female: String | null,
    front_default: String | null,
    front_female: String | null,
    front_shiny: String | null,
    front_shiny_female: String | null
  },
  stats: [],
  types: [],
  weight: Number
}

export type PokemonItemFormatted = {
  base_stat: Number,
  height: Number,
  id: Number,
  image: String,
  name: String,
  stat: String,
  type: String,
  weight: Number,
}