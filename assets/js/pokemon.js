const pokeApi = {}

function convertPokemonDetailToPokemonModel(pokemonDetail){
    const pokemon = new Pokemon()
    pokemon.pokemonNumber = pokemonDetail.id
    pokemon.pokemonName = pokemonDetail.name
    
    pokemon.pokemonWeight = pokemonDetail.weight
    pokemon.pokemonHeight = pokemonDetail.height

    const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name)
    const [ type ] = types

    pokemon.pokemonTypes = types
    pokemon.pokemonType = type

    const abilities = pokemonDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    const[ability] = abilities
    pokemon.pokemonAbilities = abilities
    pokemon.pokemonAbility = ability

    const stats = pokemonDetail.stats.map((baseStat) => (baseStat.stat.name + ' | ' + baseStat.base_stat))
    pokemon.pokemonStats = stats

    pokemon.pokemonPhoto = pokemonDetail.sprites.other["official-artwork"].front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokemonDetailToPokemonModel)
}


pokeApi.getPokemons = (offset,limite) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limite=${limite}`
    
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((error) => console.error(error))
}

pokeApi.getPokemonInfo = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return fetch(url)
        .then((response) => response.json())
        .then(convertPokemonDetailToPokemonModel)
        .catch((error) => console.error(error))
}