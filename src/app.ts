const container: HTMLElement | any = document.body.querySelector("#app")
const card: HTMLElement | any = document.body.querySelector(".poke-card");
const pokemon: number = 120;


interface IPokemon {
    id: number;
    order: number;
    name: string;
    image: string;
    type: string;
    stat: string;
    base_stat: string;
    weight: number;
    height: number;
    abilities: string;
}

let fetchAPIData = (): void => {
    for (let i = 1; i <= pokemon; i++) {
        getPokemon(i)
    }
}

const getPokemon = async (id: number): Promise<void> => {
    const data: Response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const pokemon: any = await data.json()

    
    const pokemonType: string = pokemon.types
        .map((pokemon: any) => pokemon.type.name)
        .join(", ")

    const pokemonAbilities: string = pokemon.abilities
        .map((pokemon: any) => pokemon.ability.name)
        .join(", ");

    const pokemonHP: string = pokemon.stats
        .map((pokemon: any) => pokemon.stat.name).slice(pokemon.stats.length -1)
        .join(" ");
    
    const pokemonStats: string = pokemon.stats
        .map((pokemon: any) => pokemon.base_stat).slice(pokemon.stats.length-1)
        .join(" ");


    const firstChar: string = pokemon.name.slice(0, 1).toUpperCase();
    const restOfStr: string = pokemon.name.slice(1).toLowerCase();
    const titleCasedName: string = firstChar.concat(restOfStr);

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
    }
    showPokemon(transformedPokemon);
}

/* Render HTML */
const showPokemon = (pokemon: IPokemon) : void => {
    let output: string = `
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
    `
    container.innerHTML += output;
}

fetchAPIData();