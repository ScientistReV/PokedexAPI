const loadMoreButton = document.getElementById('loadMoreButton');
const pokemonList = document.getElementById('pokemon-list');
const maxRecords = 151;
const limit = 10
let offset = 0;


function loadPokemonItens (offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(pokemon => `
            <a href = "/info?id=${pokemon.pokemonNumber}">
                <li class="pokemon ${pokemon.pokemonType}">
                    <span class="number ${pokemon.pokemonType}">#${pokemon.pokemonNumber}</span>
                    <span class="name">${pokemon.pokemonName}</span>

                    <div class="detail">
                        <ol class="types">
                            ${pokemon.pokemonTypes.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>  
                        <img src="${pokemon.pokemonPhoto}" alt="${pokemon.pokemonName}">
                    </div>
                </li>
            </a>
        `).join('')

        pokemonList.innerHTML += newHtml
    })
    .catch((error) => console.error(error))
    .finally(() => console.log('Requisição Concluida!'))
}
loadPokemonItens(offset, limit)
loadMoreButton.addEventListener('click', () =>{
    offset += limit;

    const qtdRecordMaxPage = offset + limit;

    if (qtdRecordMaxPage >= maxRecords) {
        const newLimit =  maxRecords - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
}
)