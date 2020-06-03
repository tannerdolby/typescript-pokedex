"use strict";
const container = document.body.querySelector("#app");
const pokemonToFetch = 151;
const searchBar = document.body.querySelector("#search-bar");
const searchBtn = document.body.querySelector("#submit-btn");
const anchorSearch = document.body.querySelector("#searchClick");
const clearSearch = document.body.querySelector("#clear-search");
const newPokeImg = function (pokeID) {
    let src = `https://pokeres.bastionbot.org/images/pokemon/${pokeID}.png`;
    return src;
};
const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= pokemonToFetch; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
    }
    Promise.all(promises).then((results) => {
        const pokemon = results
            .map((result) => ({
            id: result.id,
            name: result.name
                .slice(0, 1)
                .toUpperCase()
                .concat(result.name.slice(1).toLowerCase()),
            type: result.types.map((poke) => poke.type.name),
            image: newPokeImg(result.id),
            weight: result.weight,
            height: result.height,
            base_stat: result.stats
                .map((poke) => poke.base_stat)
                .slice(result.stats.length - 1)
                .join(" "),
            stat: result.stats
                .map((poke) => poke.stat.name)
                .slice(result.stats.length - 1)
                .join(" ")
                .toUpperCase()
        }))
            .sort((a, b) => a.id - b.id);
        displayPokemon(pokemon);
    });
};
const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon
        .map((pokemon) => `
            <div class="poke-card" id="${pokemon.name}">
            <div class="flexy">
                <span class="card-id">#${pokemon.id}</span>
                <span class="card-hp">${pokemon.base_stat} ${pokemon.stat} <i id="poke-hp" class="fa fa-heart" aria-hidden="true"></i></span>
            </div>
            <h1 class="card-name">${pokemon.name}</h1>
            <img class="card-image" src=${pokemon.image} alt=${pokemon.name} />
            <span class="card-details">${pokemon.type} type pokemon</span>
            <span>Length: ${pokemon.height} in, Weight: ${pokemon.weight} lbs.</span>
            <!-- <span>Abilities: ${pokemon.abilities}</span> -->
        </div>
        `)
        .join("");
    container.innerHTML = pokemonHTMLString;
};
fetchPokemon();
const mySearchStuff = () => {
    let inputStr = "";
    searchBar.addEventListener("keyup", (e) => {
        inputStr = e.target.value;
    });
    clearSearch.addEventListener("click", () => {
        searchBar.value = "";
        anchorSearch.href = "";
    });
    let promiseArr = [];
    for (let i = 1; i <= pokemonToFetch; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promiseArr.push(fetch(url).then((data) => data.json()));
    }
    Promise.all(promiseArr).then((data) => {
        const pokemon = data
            .map((poke) => ({
            name: poke.name.slice(0, 1).toUpperCase().concat(poke.name.slice(1).toLowerCase()),
            id: poke.id,
            height: poke.height,
            weight: poke.weight,
        }));
        // console.log(pokemon);
        searchBtn.addEventListener("click", () => {
            let names = pokemon.map((val) => val.name);
            for (let i = 0; i <= pokemonToFetch; i++) {
                if (inputStr === names[i]) {
                    anchorSearch.href = `#${names[i]}`;
                }
            }
        });
    });
};
mySearchStuff();
