/***Declaring new let pokemonRepository (= IIFE) with functions 'add' and 'getAll' inside to call them later over 'return path' with actual arguments***/
/**Only executing code if it's the right data type and the expected keys inside the added objects**/

let pokemonRepository = (function() {
  let modalContainer = document.querySelector('#modal-container');
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';


	function add(pokemon) {
		if (typeof pokemon === 'object' &&
			Object.keys(pokemon).includes('name') &&
			Object.keys(pokemon).includes('detailsUrl')) {
			pokemonList.push(pokemon)
		} else {
			console.log('This is no pokemon object. ');
		}
	}

  function showLoadingMessage() {
    document.querySelector('.message').classList.add('loading-message');
    document.querySelector('.message').classList.remove('hiding-message');
  }  
  function hideLoadingMessage() {
    document.querySelector('.message').classList.add('hiding-message');
    document.querySelector('.message').classList.remove('loading-message');
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
    showLoadingMessage();
    return fetch(apiUrl).then(function(response) {
      return response.json();
    }).then(function(json) {
      json.results.forEach(function(item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        hideLoadingMessage();
        add(pokemon);
      });
    }).catch(function(e) {
      hideLoadingMessage();
      console.error(e);
    })
  }
  
  function loadDetails(item) {
    setTimeout(showLoadingMessage(), 3000);
    let url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function(details) {
      hideLoadingMessage();
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types
      .map(type => type.type.name)
      .join(', ');
      item.abilities = details.abilities
      .map(ability => ability.ability.name)
      .join(', ');
    }).catch(function(e) {
      hideLoadingMessage();
      console.error(e);
    });
  }


  function showDetails(item) {
    pokemonRepository.loadDetails(item).then(function () {
      showModal('Name: ' + item.name.toUpperCase(), 'Height: ' + item.height, 'Types: ' + item.types, 'Abilities: ' + item.abilities, item.imageUrl);
    });
  }

  
  function showModal(name, height, types, abilities, image) {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');
    
  // Add the new modal content
    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);
    
    let titleElement = document.createElement('h1');
    titleElement.innerText = name;

    let contentElement1 = document.createElement('p');
    contentElement1.innerText = height;
    
    let contentElement2 = document.createElement('p');
    contentElement2.innerText = types;

    let abilitiesElement = document.createElement('div');
    abilitiesElement.innerText = abilities;

    let imageElement = document.createElement('img');
    imageElement.setAttribute('src', image);
    imageElement.setAttribute('alt', 'pokemon-image');
    
    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement1);
    modal.appendChild(contentElement2);
    modal.appendChild(imageElement);
    modal.appendChild(abilitiesElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
  }
  //Hide Modal function
  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  //Hiding Modal with ESC key:
  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && 
    modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });
  //Hiding Modal with clicking outside the Modal:
  modalContainer.addEventListener('click', (event) => {
    let target = event.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

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
	pokemonRepository.getAll().forEach(function(pokemon) {
		pokemonRepository.addListItem(pokemon);
	});
});