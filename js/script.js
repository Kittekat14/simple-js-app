/*This Array contains the Pokémon Objects(key-value-pairs = properties inside) with the same keys to avoid errors - name of the key in plural, when arrays*/
let pokemonList = [
  {
    name: 'Charmander', 
    height: 0.6,
    type: 'Fire',
    abilities: ['Blaze','Solar-power']
  },
  {
    name: 'Squirtle',
    height: 0.5,
    type: 'Water',
    abilities: ['Rain-dish', 'Torrent']
  },
  {
    name: 'Bulbasaur',
    height: 0.7,
    type: 'Grass',
    abilities: ['Chlorophyll', 'Overgrow']
  },
  {
    name: 'Butterfree',
    height: 1.1,
    type: 'Bug',
    abilities: ['Compoundeyes', 'Tinted-lens']
  },
  {
    name: 'Vulpix',
    height: 0.6,
    type: 'Fire',
    abilities: ['Flash-fire', 'Drought']
  },
  {
    name: 'Psyduck',
    height: 0.8,
    type: 'Water',
    abilities: ['Damp', 'Cloud-nine', 'Swift-swim']
  },
  {
    name: 'Ekans',
    height: 2,
    type: 'Poison',
    abilities: ['Intimidate', 'Shed-skin', 'Unnerve']
  },
  {
    name: 'Pikachu',
    height: 0.4,
    type: 'Electric',
    abilities: ['Static', 'Lightningrod']
  }
];

/*for loop through the array of pokemon items: if the height of a pokemon is bigger than or equal to 2, it is considered to be a big pokemon*/ 
for (i=0; i<pokemonList.length; i++) {
  if (pokemonList[i].height>=2) {
  document.write(`<b> ${pokemonList[i].name} (height: ${pokemonList[i].height}m) <br> - "WOW, that's a big pokemon!"</b><br>`);
  } else {
    document.write(`<i>${pokemonList[i].name} (height: ${pokemonList[i].height}m) <br> - "This pokemon is still growing!" </i><br>`)
  }
}
