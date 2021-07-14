/***Declaring new let pokemonRepository (= IIFE) with functions 'add' and 'getAll' inside to call them later over 'return path' with actual arguments***/
/**Only executing code if it's the right data type and the expected keys inside the added objects**/

let pokemonRepository = (function() {

  let pokemonList = []; //still empty array;

  function add(pokemon) {
    if(typeof pokemon === 'object' && Object.keys(pokemon).includes('name') && Object.keys(pokemon).includes('height') && Object.keys(pokemon).includes('types') && Object.keys(pokemon).includes('abilities')) {
    pokemonList.push(pokemon)} else {
    document.write(`This is no pokemon object. `);
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let unorderedList = document.querySelector('ul');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    
    unorderedList.appendChild('listItem');

    listItem.appendChild('button');
    
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };

})();

/***Adding with add-Function new pokemon objects to the empty predefined array***/

pokemonRepository.add(
  {
    name: 'Pidgeotto',
    height: 1.1,
    types: ['Flying', 'Normal'],
    abilities: ['Keen-eye', 'Tangled-feet']
  }
);
pokemonRepository.add(
  {
    name: 'Butterfree',
    height: 1.1,
    types: ['Bug','Flying'],
    abilities: ['Compoundeyes', 'Tinted-lens']
  }
);
pokemonRepository.add(
  {
    name: 'Charizard',
    height: 1.7,
    types: ['Fire','Flying'],
    abilities: ['Blaze', 'Solar-power']
  }
);

console.log(pokemonRepository.getAll());




/* forEach-Loop through the pokemonRepository Array : over the getAll()-function, we get to return the whole pokemonList*/ 



pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);

});
