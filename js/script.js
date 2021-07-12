/*This Array contains the Pokémon Objects(key-value-pairs = properties inside) with the same keys to avoid errors + key in plural, when arrays following*/
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

/*for loop through the array of pokemon items: if the height of a pokemon is bigger than or equal to 2, it is considered to be a big pokemon*/ 
document.write('<ul>');
for (i=0; i<pokemonList.length; i++) {
  document.write('<li>');
  if (pokemonList[i].height>=1.8) {
  document.write(`<b>${pokemonList[i].name} (height: ${pokemonList[i].height}m) - "WOW, that's a big pokemon!"</b>`);
  } else {
  document.write(`<i>${pokemonList[i].name} (height: ${pokemonList[i].height}m) - "This pokemon is still growing!"</i>`);
  }
  document.write('</li>');
}
document.write('</ul>');