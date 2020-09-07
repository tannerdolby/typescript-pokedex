const container: HTMLElement | any = document.body.querySelector("#app");
const pokemonToFetch: number = 151;
const searchBar: HTMLElement | any = document.body.querySelector("#search-bar");
const searchBtn: HTMLElement | any = document.body.querySelector("#submit-btn");
const anchorSearch: HTMLElement | any = document.body.querySelector("#searchClick");
const clearSearch: HTMLElement | any = document.body.querySelector("#clear-search");

const newPokeImg = function(pokeID: any) {
  let src = `https://pokeres.bastionbot.org/images/pokemon/${pokeID}.png`;
  return src;
};

const fetchPokemon = () => {
  const promises = [];
  for (let i = 1; i <= pokemonToFetch; i++) {
    const url: string = `https://pokeapi.co/api/v2/pokemon/${i}/`;
    promises.push(fetch(url).then((res: any) => res.json()));
  }
  Promise.all(promises).then((results: any) => {
    const pokemon = results
      .map((result: any) => ({
        id: result.id,
        name: result.name
          .slice(0, 1)
          .toUpperCase()
          .concat(result.name.slice(1).toLowerCase()),
        type: result.types.map((poke: any) => poke.type.name).join(", "),
        image: newPokeImg(result.id),
        weight: result.weight,
        height: result.height,
        base_stat: result.stats
          .map((poke: any) => poke.base_stat)
          .slice(result.stats.length - 1)
          .join(" "),
        stat: result.stats
          .map((poke: any) => poke.stat.name)
          .slice(0, 1)
          .join(" ")
          .toUpperCase()
      }))
      .sort((a: any, b: any) => a.id - b.id);
    displayPokemon(pokemon);
  });
};

const displayPokemon = (pokemon: any) => {
  const pokemonHTMLString = pokemon
    .map(
      (pokemon: any) => `
            <div class="poke-card" id="${pokemon.name}">
            <div class="flexy">
                <span class="card-id">#${pokemon.id}</span>
                <span class="card-hp">${pokemon.base_stat} ${pokemon.stat} <i id="poke-hp" class="fa fa-heart" aria-hidden="true"></i></span>
            </div>
            <h1 class="card-name">${pokemon.name}</h1>
            <img class="card-image" src=${pokemon.image} alt=${pokemon.name} loading="lazy" />
            <span class="card-details">${pokemon.type} type</span>
            <span>Length: ${pokemon.height} in, Weight: ${pokemon.weight} lbs.</span>
            <!-- <span>Abilities: ${pokemon.abilities}</span> -->
        </div>
        `
    )
    .join("");
  container.innerHTML = pokemonHTMLString;
};
fetchPokemon();

const mySearchStuff = (): void => {
    let inputStr = "";
    searchBar.addEventListener("keyup", (e: any) => {
      e.preventDefault();
      inputStr = e.target.value;
    });
    clearSearch.addEventListener("click", () => {
      searchBar.value = "";
      anchorSearch.href = "";
    });

    let promiseArr = [];
    for (let i = 1; i <= pokemonToFetch; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}/`;
        promiseArr.push(fetch(url).then((data: any) => data.json()))
    }
    Promise.all(promiseArr).then((data: any) => {
        const pokemon: any =  data
            .map((poke: any) => ({
                name: poke.name.slice(0,1).toUpperCase().concat(poke.name.slice(1).toLowerCase()),
                id: poke.id,
                height: poke.height,
                weight: poke.weight,
            }))
        
        searchBtn.addEventListener("click", () => {
            let names = pokemon.map((val: any) => val.name);
            for (let i = 0; i <= pokemonToFetch; i++) {
                if (inputStr === names[i]) {
                    anchorSearch.href = `#${names[i]}`;
                }
            }
            if (inputStr === "") {
              anchorSearch.href = "#";
            }
        })

    })
}
mySearchStuff();