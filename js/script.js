const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');

const prev = document.querySelector('.btn-prev');
const next = document.querySelector('.btn-next');

let currentPokemon = 1;
const maxPokemons = 1025;

String.prototype.isNumber = function(){return /^\d+$/.test(this);}

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading ...';
    const data = await fetchPokemon(pokemon);
    currentPokemon = pokemon;
    if (data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        const imgData = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        if (imgData) {
            pokemonImage.src = imgData;
            pokemonImage.style.display = 'block';
        } else {
            pokemonImage.style.display = 'none';
        }
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Unknown'
        pokemonNumber.innerHTML = '?'
        if (pokemon.isNumber()) {
            if (currentPokemon > maxPokemons) {
                currentPokemon = maxPokemons + 1
            } else if (currentPokemon < 1) {
                currentPokemon = 0
            }
        } else {
            currentPokemon = 0
        }
    }
    input.value = '';
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    renderPokemon(input.value.toLowerCase());
});

prev.addEventListener('click', (event) => {
    if (currentPokemon > 1) {
        currentPokemon -= 1;
        renderPokemon(currentPokemon)
    }
});

next.addEventListener('click', (event) => {
    if (currentPokemon < maxPokemons) {
        currentPokemon += 1;
        renderPokemon(currentPokemon)
    }
});

renderPokemon(currentPokemon)