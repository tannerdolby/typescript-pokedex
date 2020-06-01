"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const container = document.body.querySelector("#app");
// const searchBar: HTMLElement | any = document.body.querySelector("#searchBar");
// const searchBtn: HTMLElement | any = document.body.querySelector("#search-btn");
const pokemonToFetch = 151;
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
// function to iterate through all json response up until the number of pokemon specified to fetch
const hitAPI = () => {
    for (let i = 1; i <= pokemonToFetch; i++) {
        mySearchFetch(i);
    }
};
// fetches a single pokemon or response result from poke api
const mySearchFetch = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const fetcher = yield fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = yield fetcher.json();
    return pokemon;
});
hitAPI();
