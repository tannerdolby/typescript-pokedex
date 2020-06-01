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
const card = document.body.querySelector(".poke-card");
const pokemon = 120;
let fetchAPIData = () => {
    for (let i = 1; i <= pokemon; i++) {
        getPokemon(i);
    }
};
const getPokemon = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = yield data.json();
    const pokemonType = pokemon.types
        .map((pokemon) => pokemon.type.name)
        .join(", ");
    const pokemonAbilities = pokemon.abilities
        .map((pokemon) => pokemon.ability.name)
        .join(", ");
    const pokemonHP = pokemon.stats
        .map((pokemon) => pokemon.stat.name).slice(pokemon.stats.length - 1)
        .join(" ");
    const pokemonStats = pokemon.stats
        .map((pokemon) => pokemon.base_stat).slice(pokemon.stats.length - 1)
        .join(" ");
    const firstChar = pokemon.name.slice(0, 1).toUpperCase();
    const restOfStr = pokemon.name.slice(1).toLowerCase();
    const titleCasedName = firstChar.concat(restOfStr);
    const transformedPokemon = {
        id: pokemon.id,
        order: pokemon.order,
        name: titleCasedName,
        stat: pokemonStats,
        base_stat: pokemonHP,
        image: `${pokemon.sprites.front_default}`,
        type: pokemonType,
        weight: pokemon.weight,
        height: pokemon.height,
        abilities: pokemonAbilities,
    };
    showPokemon(transformedPokemon);
});
/* Render HTML */
const showPokemon = (pokemon) => {
    let output = `
        <div class="poke-card" id="${pokemon.name}">
            <div class="flexy">
                <span class="card-id">#${pokemon.id} </span>
                <span class="card-hp"><i id="poke-hp" class="fa fa-heart" aria-hidden="true"></i>${pokemon.stat}${pokemon.base_stat}</span>
            </div>
            <h1 class="card-name">${pokemon.name}</h1>
            <img class="card-image" src=${pokemon.image} alt=${pokemon.name} />
            <span class="card-details">${pokemon.type} type pokemon</span>
            <span>Length: ${pokemon.height} in, Weight: ${pokemon.weight} lbs.</span>
            <!-- <span>Abilities: ${pokemon.abilities}</span> -->
        </div>
    `;
    container.innerHTML += output;
};
fetchAPIData();
