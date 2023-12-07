var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const container = document.body.querySelector('#app');
const pokemonToFetch = 151;
const BATCH_SIZE = 30;
const POKEMON_BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';
function dataFetcher(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(url);
            const json = yield res.json();
            return json;
        }
        catch (error) {
            throw new Error(`Unable to fetch data for url: ${url}\n${error}`);
        }
    });
}
function getPokemonCardHTML(pokemon) {
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
function formatPokemonJSON(json) {
    const id = json.id;
    const name = json.name;
    return ({
        id: id,
        name: name
            .slice(0, 1)
            .toUpperCase()
            .concat(name.slice(1).toLowerCase()),
        type: json.types.map((poke) => poke.type.name).join(', '),
        image: json.sprites.front_default,
        weight: json.weight,
        height: json.height,
        base_stat: json.stats
            .map((poke) => poke.base_stat)
            .slice(json.stats.length - 1)
            .join(' '),
        stat: json.stats
            .map((poke) => poke.stat.name)
            .slice(0, 1)
            .join(' ')
            .toUpperCase(),
        abilities: json.abilities.map(item => item.ability.name).join(', '),
    });
}
const fetchPokemon = (start, end) => __awaiter(void 0, void 0, void 0, function* () {
    const pokemon = [];
    for (let i = start; i <= end; i++) {
        pokemon.push(dataFetcher(POKEMON_BASE_URL + i));
    }
    return (yield Promise.all(pokemon))
        .map(formatPokemonJSON)
        .sort((a, b) => a.id - b.id);
});
const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon.map(getPokemonCardHTML).join('');
    if (!container)
        return;
    container.innerHTML += pokemonHTMLString;
};
const handleSearch = () => {
    const searchBar = document.body.querySelector('#search-bar');
    const searchBtn = document.body.querySelector('#submit-btn');
    const anchorSearch = document.body.querySelector('#searchClick');
    const clearSearch = document.body.querySelector('#clear-search');
    let inputStr = '';
    if (!searchBar || !clearSearch || !searchBtn)
        return;
    searchBar.addEventListener('keyup', (e) => {
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
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        handleSearch();
        let start = 1;
        let end = BATCH_SIZE;
        while (start <= pokemonToFetch) {
            if (end >= pokemonToFetch) {
                end = pokemonToFetch;
            }
            displayPokemon(yield fetchPokemon(start, end));
            start += BATCH_SIZE;
            end += BATCH_SIZE;
        }
    });
}
main();
