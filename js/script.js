/*This Array contains key-value-pairs = properties for pokemon objects inside an array with the same keys to avoid errors - name of the key in plural, when array after that + is now located in an safe IIFE (to never be invoked later)*/
let pokemonSafeList = (function () {
  let pokemonList = [
    {
      name: 'Bellsprout', 
      height: 0.7,
      types: ['Grass', 'Poison'],
      abilities: ['Chlorophyll','Gluttony']
    },
    {
      name: 'Geodude',
      height: 0.4,
      types: ['Rock', 'Ground'],
      abilities: ['Sturdy', 'Sand-veil', 'Rock-head']
    },
    {
      name: 'Bulbasaur',
      height: 0.7,
      types: ['Grass', 'Poison'],
      abilities: ['Chlorophyll', 'Overgrow']
    },
    {
      name: 'Dewgong',
      height: 1.7,
      types: ['Ice', 'Water'],
      abilities: ['Thick-fat', 'Hydration', 'Ice-body']
    },
    {
      name: 'Slowpoke',
      height: 1.2,
      types: ['Psychic', 'Water'],
      abilities: ['Own-tempo', 'Oblivious', 'Regenerator']
    },
    {
      name: 'Paras',
      height: 0.3,
      types: ['Grass', 'Bug'],
      abilities: ['Damp', 'Effect-spore', 'Dry-skin']
    },
    {
      name: 'Rhydon',
      height: 1.9,
      types: ['Rock', 'Ground'],
      abilities: ['Lightningrod', 'Rock-head', 'Reckless']
    },
    {
      name: 'Doduo',
      height: 1.4,
      types: ['Flying', 'Normal'],
      abilities: ['Early-bird', 'Run-away', 'Tangled-feet']
    }
  ];
}) ();


/**Declaring new let pokemonRepository (= IIFE) + functions 'add' and 'getAll' inside to call them later over 'return path' with actual arguments**/
/*** Only executing code if it's the right data type and the expected keys inside the added objects */
let pokemonRepository = (function () {
  let pokemonList = []; //still empty array;

  function add(pokemon) {
    if (typeof pokemon === 'object' && Object.keys(pokemon) === ['name', 'height', 'types', 'abilities']) {
    pokemonList.push(pokemon);
    }
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();


/***Adding with add-Function new pokemon objects to the empty predefined array***/
pokemonRepository.add(
  {
    name: 'Pidgeotto',
    height: 1.1,
    types: ['Flying', 'Normal'],
    abilities: ['Keen-eye', 'Tangled-feet', 'Big-pecks']
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


/* forEach-Loop through the pokemonRepository Array : over the getAll()-function, we get to return the whole pokemonList*/ 

document.write('<ul>');

pokemonRepository.getAll().forEach(function(pokemon) {
  
  document.write('<li>');
  if (pokemon.height>=1.8) {
  document.write(`<b>${pokemon.name} (height: ${pokemon.height}m) - "WOW, that's a big pokemon!"</b>`);
  } else {
  document.write(`<i>${pokemon.name} (height: ${pokemon.height}m) - "This pokemon is still growing!"</i>`);
  }
  document.write('</li>');
  
});

document.write('</ul>');
 

  

