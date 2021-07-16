/***Declaring new let pokemonRepository (= IIFE) with functions 'add' and 'getAll' inside to call them later over 'return path' with actual arguments***/
/**Only executing code if it's the right data type and the expected keys inside the added objects**/

let pokemonRepository = (function() {

  let pokemonList = []; //still empty array;
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';

  function add(pokemon) {
    // if
    // (typeof pokemon === 'object' 
    // && Object.keys(pokemon).includes('name') 
    // && Object.keys(pokemon).includes('detailsURL')) {
    pokemonList.push(pokemon)
    //} else {
    // console.log(`This is no pokemon object. `);
    // }
  }

  function getAll() {
    return pokemonList;
  }

  
  function addListItem(pokemon) {
    let unorderedList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    unorderedList.appendChild(listItem); 
    button.addEventListener('click', function(event) {
      showDetails(pokemon);   //inside the code-block must be the calling of actually-doing-something-function
    });
  }

  function loadList () {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
    console.log(item);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };

})();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});