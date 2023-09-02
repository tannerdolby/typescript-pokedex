var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const container = document.body.querySelector('#app');
const pokemonToFetch = 151;
const fetchPokemon = () => __awaiter(this, void 0, void 0, function* () {
    const promises = [];
    for (let i = 1; i <= pokemonToFetch; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    const pokemonPromises = yield Promise.all(promises);
    return pokemonPromises
        .map((result) => ({
        id: result.id,
        name: result.name
            .slice(0, 1)
            .toUpperCase()
            .concat(result.name.slice(1).toLowerCase()),
        type: result.types.map((poke) => poke.type.name).join(', '),
        image: result.sprites.front_default,
        weight: result.weight,
        height: result.height,
        base_stat: result.stats
            .map((poke) => poke.base_stat)
            .slice(result.stats.length - 1)
            .join(' '),
        stat: result.stats
            .map((poke) => poke.stat.name)
            .slice(0, 1)
            .join(' ')
            .toUpperCase()
    }))
        .sort((a, b) => a.id - b.id);
});
const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon
        .map((pokemon) => `
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
        `).join('');
    if (!container)
        return;
    container.innerHTML = pokemonHTMLString;
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
        anchorSearch.href = `#${inputStr}`;
    });
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        displayPokemon(yield fetchPokemon());
        handleSearch();
    });
}
main();
