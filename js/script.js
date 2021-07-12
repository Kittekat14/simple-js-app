/*This Array contains key-value-pairs = properties for pokemon objects inside with the same keys to avoid errors - name of the key in plural, when arrays and is located now in an safe IIFE (all now local variables)*/
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


let pokemonRepository = (function () {
  let pokemonList = []; //still empty array;

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();
pokemonRepository.getAll();
pokemonRepository.add(
  {
    name:'Pidgeot', 
    height: 1.5, 
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


console.log(pokemonRepository.getAll());



/* forEach-Loop through the pokemonRepository Array : over the getAll()-function, we get to return the whole pokemonList*/ 
pokemonRepository.getAll().forEach(function(pokemon) {
  document.write('<ul>');
  document.write('<li>');
  if (pokemon.height>=1.8) {
  document.write(`<b>${pokemon.name} (height: ${pokemon.height}m) - "WOW, that's a big pokemon!"</b>`);
  } else {
  document.write(`<i>${pokemon.name} (height: ${pokemon.height}m) - "This pokemon is still growing!"</i>`);
  }
  document.write('</li>');
  document.write('</ul>');
});
 

  




/*for loop through the array of pokemon items: if the height of a pokemon is bigger than or equal to 2, it is considered to be a big pokemon*/ 
/*for (i=0; i<pokemonList.length; i++) {
  if (pokemonList[i].height>=1.8) {
  document.write(`<ul><li><b> ${pokemonList[i].name} (height: ${pokemonList[i].height}m) <br> - "WOW, that's a big pokemon!" </li></ul></b><br>`);
  } else {
    document.write(`<ul><li><i> ${pokemonList[i].name} (height: ${pokemonList[i].height}m) <br> - "This pokemon is still growing!" </li></ul></i><br>`)
  }
}

  

/* ****other version of IIFE and getting into the secure function with return:  


let pokemonRepository = (function () {
  let pokemonList = []; // empty array

  return {
    add: function(pokemon) {
      pokemonList.push(pokemon);
    },
    getAll: function() {
      return pokemonList;
    }
  };
})();

console.log(pokemonRepository.getAll()); // []
pokemonRepository.add({ name: 'Pikachu' });
console.log(pokemonRepository.getAll()); // [ { name: 'Pikachu' } ]
*/

