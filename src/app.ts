const container = document.body.querySelector('#app');
const pokemonToFetch = 151;
import { Pokemon, PokemonItemFormatted } from './types';

const fetchPokemon = async (): Promise<PokemonItemFormatted[]> => {
  const promises = [];

  for (let i = 1; i <= pokemonToFetch; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res: Response) => res.json()));
  }

  const pokemonPromises: Pokemon[] = await Promise.all(promises);

  return pokemonPromises
    .map((result: any) => ({
      id: result.id,
      name: result.name
        .slice(0, 1)
        .toUpperCase()
        .concat(result.name.slice(1).toLowerCase()),
      type: result.types.map((poke: any) => poke.type.name).join(', '),
      image: result.sprites.front_default,
      weight: result.weight,
      height: result.height,
      base_stat: result.stats
        .map((poke: any) => poke.base_stat)
        .slice(result.stats.length - 1)
        .join(' '),
      stat: result.stats
        .map((poke: any) => poke.stat.name)
        .slice(0, 1)
        .join(' ')
        .toUpperCase()
    }))
    .sort((a, b) => a.id - b.id);
};

const displayPokemon = (pokemon: PokemonItemFormatted[]) => {
  const pokemonHTMLString = pokemon
    .map((pokemon: PokemonItemFormatted) => `
            <div class='poke-card' id='${pokemon.name}'>
            <div class='flexy'>
                <span class='card-id'>#${pokemon.id}</span>
                <span class='card-hp'>${pokemon.base_stat} ${pokemon.stat} <i id='poke-hp' class='fa fa-heart' aria-hidden='true'></i></span>
            </div>
            <h1 class='card-name'>${pokemon.name}</h1>
            <img class='card-image' src=${pokemon.image} alt=${pokemon.name} loading='lazy' />
            <span class='card-details'>${pokemon.type} type</span>
            <span>Length: ${pokemon.height} in, Weight: ${pokemon.weight} lbs.</span>
        </div>
        `
    ).join('');
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
    anchorSearch.href = `#${inputStr}`;
  });
}

async function main() {
  displayPokemon(await fetchPokemon());
  handleSearch();
}

main();
