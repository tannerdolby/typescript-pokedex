const container = document.body.querySelector('#app');
const pokemonToFetch = 151;
import { Pokemon, PokemonItemFormatted } from './types';

const POKEMON_BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

async function dataFetcher(url: string | RequestInfo) {
  try {
    const res = await fetch(url);
    const json = await res.json();
    return json;
  } catch (error) {
    throw new Error(`Unable to fetch data for url: ${url}\n${error}`);
  }
}

function getPokemonCardHTML(pokemon: PokemonItemFormatted): string {
  return `
    <div class='poke-card' id='${pokemon.name.toLowerCase()}'>
      <div class='flexy'>
        <span class='card-id'>#${pokemon.id}</span>
        <span class='card-hp'>${pokemon.base_stat} ${pokemon.stat} <i id='poke-hp' class='fa fa-heart' aria-hidden='true'></i></span>
      </div>
      <h1 class='card-name'>${pokemon.name}</h1>
      <img class='card-image' src='${pokemon.image}' alt='${pokemon.name}' loading='lazy' />
      <span class='card-details'>${pokemon.type} type</span>
      <span style='padding: 0'>Length: ${pokemon.height} in, Weight: ${pokemon.weight} lbs.</span>
      <span style='padding: 0 .25rem'>Abilities: ${pokemon.abilities}</span>
    </div>
  `;
}

function formatPokemonJSON(json: Pokemon): PokemonItemFormatted {
  const id = json.id;
  const name = json.name;
  return ({
      id: id,
      name: name
        .slice(0, 1)
        .toUpperCase()
        .concat(name.slice(1).toLowerCase()),
      type: json.types.map((poke: any) => poke.type.name).join(', '),
      image: json.sprites.front_default,
      weight: json.weight,
      height: json.height,
      base_stat: json.stats
        .map((poke: any) => poke.base_stat)
        .slice(json.stats.length - 1)
        .join(' '),
      stat: json.stats
        .map((poke: any) => poke.stat.name)
        .slice(0, 1)
        .join(' ')
        .toUpperCase(),
      abilities: json.abilities.map(item => item.ability.name).join(', '),
  });
}

const fetchPokemon = async (): Promise<PokemonItemFormatted[]> => {
  const pokemon: Pokemon[] = [];

  for (let i = 1; i <= pokemonToFetch; i++) {
    pokemon.push(await dataFetcher(POKEMON_BASE_URL + i));
  }

  console.log('pokemon', pokemon);
  
  return pokemon.map(formatPokemonJSON).sort((a, b) => a.id - b.id);
};

const displayPokemon = (pokemon: PokemonItemFormatted[]) => {
  const pokemonHTMLString = pokemon.map(getPokemonCardHTML).join('');
  if (!container) return;
  container.innerHTML = pokemonHTMLString;
};

const handleSearch = (): void => {
  const searchBar = document.body.querySelector('#search-bar') as HTMLInputElement;
  const searchBtn = document.body.querySelector('#submit-btn');
  const anchorSearch = document.body.querySelector('#searchClick') as HTMLAnchorElement;
  const clearSearch = document.body.querySelector('#clear-search');
  let inputStr = '';

  if (!searchBar || !clearSearch || !searchBtn) return;

  searchBar.addEventListener('keyup', (e: any) => {
    e.preventDefault();
    inputStr = e.target.value;
  });

  clearSearch.addEventListener('click', () => {
    searchBar.value = '';
    anchorSearch.href = '';
    inputStr = '';
  });

  searchBtn.addEventListener('click', () => {
    anchorSearch.href = `#${inputStr.toLowerCase()}`;
  });
}

async function main() {
  displayPokemon(await fetchPokemon());
  handleSearch();
}

main();
