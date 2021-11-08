const URL = `https://pokeapi.co/api/v2/pokemon/`;
const pokemon = document.getElementById('buscador');
const buttonBuscar = document.getElementById('buscarPokemon');
const buttonEliminar= document.getElementById('eliminarPokemon');
const appNode = document.getElementById('app');

buttonBuscar.addEventListener("click", insertarPokemon);
buttonEliminar.addEventListener("click", eliminarPokemon);

function insertarPokemon() {
    fetch(`${URL}${pokemon.value.toLowerCase()}`)
     .then(response =>{
         if(response.status === 404){
             alert('Este pokemon no está disponible, intenta con otro')
         }
         else{
             return response.json();
         }
     })
     .then (responseJSON =>{
         const allItems = [];

         const result = [];

         for ( let pokemonInfo in responseJSON){
             result.push([pokemonInfo,responseJSON[pokemonInfo]])
         }

         console.table(result)

         //Imagen
         const pokemonImage = document.createElement('img');
          pokemonImage.classList.add('pokemonImg')
          
          pokemonImage.src = result[14][1].front_default;
          //name 
          const pokemonName = document.createElement('h2');
          pokemonName.classList.add('font')
          pokemonName.innerText = `Name: ${result[10][1].toUpperCase()}`;
          //id
          const pokemonID = document.createElement('h2')
          pokemonID.classList.add('font')
          pokemonID.innerText=`ID: ${result[6][1]}`
          //Type  
          const pokemonType = document.createElement('h2')
          pokemonType.classList.add('font')
          pokemonType.innerText = `Type: ${result[16][1][0].type.name}`
          //stats
          const pokemonStats = document.createElement('h2')
          pokemonStats.classList.add('font')
          pokemonStats.innerText = `Base Stats: ${result[15][1][0].base_stat}`
          //games
          const pokemonGames = document.createElement('h2');
          pokemonGames.classList.add('font')
          pokemonGames.innerText=`Games: ${result[3][1].length}`  
          //contenedor
          const container = document.createElement('div')
          container.append(pokemonImage , pokemonName, pokemonID , pokemonStats, pokemonGames, pokemonType);
          container.classList.add('card-gradient')

          allItems.push(container);
          
          appNode.append(...allItems)

         
     })
}
function eliminarPokemon() {
    let allPokemon = appNode.childNodes;
    allPokemon = Array.from(allPokemon);

    allPokemon.forEach(pokemon =>{
     pokemon.remove(pokemon);
    })
}