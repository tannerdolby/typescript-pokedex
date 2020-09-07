var container = document.body.querySelector("#app");
var pokemonToFetch = 151;
var searchBar = document.body.querySelector("#search-bar");
var searchBtn = document.body.querySelector("#submit-btn");
var anchorSearch = document.body.querySelector("#searchClick");
var clearSearch = document.body.querySelector("#clear-search");
var newPokeImg = function (pokeID) {
    var src = "https://pokeres.bastionbot.org/images/pokemon/" + pokeID + ".png";
    return src;
};
var fetchPokemon = function () {
    var promises = [];
    for (var i = 1; i <= pokemonToFetch; i++) {
        var url = "https://pokeapi.co/api/v2/pokemon/" + i + "/";
        promises.push(fetch(url).then(function (res) { return res.json(); }));
    }
    Promise.all(promises).then(function (results) {
        var pokemon = results
            .map(function (result) { return ({
            id: result.id,
            name: result.name
                .slice(0, 1)
                .toUpperCase()
                .concat(result.name.slice(1).toLowerCase()),
            type: result.types.map(function (poke) { return poke.type.name; }).join(", "),
            image: newPokeImg(result.id),
            weight: result.weight,
            height: result.height,
            base_stat: result.stats
                .map(function (poke) { return poke.base_stat; })
                .slice(result.stats.length - 1)
                .join(" "),
            stat: result.stats
                .map(function (poke) { return poke.stat.name; })
                .slice(0, 1)
                .join(" ")
                .toUpperCase()
        }); })
            .sort(function (a, b) { return a.id - b.id; });
        displayPokemon(pokemon);
    });
};
var displayPokemon = function (pokemon) {
    var pokemonHTMLString = pokemon
        .map(function (pokemon) { return "\n            <div class=\"poke-card\" id=\"" + pokemon.name + "\">\n            <div class=\"flexy\">\n                <span class=\"card-id\">#" + pokemon.id + "</span>\n                <span class=\"card-hp\">" + pokemon.base_stat + " " + pokemon.stat + " <i id=\"poke-hp\" class=\"fa fa-heart\" aria-hidden=\"true\"></i></span>\n            </div>\n            <h1 class=\"card-name\">" + pokemon.name + "</h1>\n            <img class=\"card-image\" src=" + pokemon.image + " alt=" + pokemon.name + " loading=\"lazy\" />\n            <span class=\"card-details\">" + pokemon.type + " type</span>\n            <span>Length: " + pokemon.height + " in, Weight: " + pokemon.weight + " lbs.</span>\n            <!-- <span>Abilities: " + pokemon.abilities + "</span> -->\n        </div>\n        "; })
        .join("");
    container.innerHTML = pokemonHTMLString;
};
fetchPokemon();
var mySearchStuff = function () {
    var inputStr = "";
    searchBar.addEventListener("keyup", function (e) {
        e.preventDefault();
        inputStr = e.target.value;
    });
    clearSearch.addEventListener("click", function () {
        searchBar.value = "";
        anchorSearch.href = "";
    });
    var promiseArr = [];
    for (var i = 1; i <= pokemonToFetch; i++) {
        var url = "https://pokeapi.co/api/v2/pokemon/" + i + "/";
        promiseArr.push(fetch(url).then(function (data) { return data.json(); }));
    }
    Promise.all(promiseArr).then(function (data) {
        var pokemon = data
            .map(function (poke) { return ({
            name: poke.name.slice(0, 1).toUpperCase().concat(poke.name.slice(1).toLowerCase()),
            id: poke.id,
            height: poke.height,
            weight: poke.weight
        }); });
        searchBtn.addEventListener("click", function () {
            var names = pokemon.map(function (val) { return val.name; });
            for (var i = 0; i <= pokemonToFetch; i++) {
                if (inputStr === names[i]) {
                    anchorSearch.href = "#" + names[i];
                }
            }
            if (inputStr === "") {
                anchorSearch.href = "#";
            }
        });
    });
};
mySearchStuff();
