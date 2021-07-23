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
		let unorderedList = document.querySelector('.list-group');
		let listItem = document.createElement('li');
		let button = document.createElement('button');
		button.innerText = pokemon.name;
		button.classList.add('pokemon-button');
		button.classList.add('btn');
		button.classList.add('btn-lg');
		button.classList.add('text-center');
		button.classList.add('btn-success');
		button.classList.add('btn-block');
		button.setAttribute('data-toggle', 'modal');
		button.setAttribute('data-target', '#exampleModal');
		listItem.setAttribute('role', 'presentation');
		listItem.classList.add('list-group-item', 'list-group-item-action');
		listItem.appendChild(button);
		unorderedList.appendChild(listItem);
		button.addEventListener('click', function(event) {
			showDetails(pokemon); //inside the code-block must be the calling of actually-doing-something-function
		});
	}

	function loadList() {
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
		showLoadingMessage();
		let url = item.detailsUrl;
		return fetch(url).then(function(response) {
			return response.json();
		}).then(function(details) {
			hideLoadingMessage();
			// Now we add the details to the item
			item.imageUrlFront = details.sprites.front_default;
			item.imageUrlBack = details.sprites.back_default;
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
		pokemonRepository.loadDetails(item).then(function() {
			showModal('Name: ' + item.name.toUpperCase(), 'Height: ' + item.height, 'Types: ' + item.types, 'Abilities: ' + item.abilities, item.imageUrl);
		});
	}


	function showModal(item) {
		let modalContainer = document.querySelector('#modal-container');
		modalContainer.innerHTML = '';
		let modal = document.querySelector('#exampleModal');
		modal.classList.add('modal');

		let modalTitle = $('.modal-title');
		let modalBody = $('.modal-body');
		let modalHeader = $('.modal-header');
		modalTitle.empty();
		modalBody.empty();
		// Add the new modal content:
		// creating element for name on modal content
		let nameElement = $('<h1>' + item.name + '</h1>');
		let imageElementFront = $('<img class="modal-img" style="width:50%">');
		imageElementFront.attr('src', item.imageUrlFront);
		let imageElementBack = $('<img class="modal-img" style="width:50%">');
		imageElementBack.attr('src', item.imageUrlBack);
		// creating element for height, types and abilities:
		let heightElement = $('<p>' + "height : " + item.height + '</p>');
		let typesElement = $('<p>' + "types : " + item.types + '</p>');
		let abilitiesElement = $('<p>' + "abilities : " + item.abilities + '</p>');

		modalTitle.append(nameElement);
		modalBody.append(imageElementFront);
		modalBody.append(imageElementBack);
		modalBody.append(heightElement);
		modalBody.append(typesElement);
		modalBody.append(abilitiesElement);


//existing content of the model:
let closeButtonElement = document.querySelector('.close');
closeButtonElement.classList.add('modal-close');
closeButtonElement.innerText = 'Close';
closeButtonElement.addEventListener('click', hideModal);


modalTitle.append(nameElement);
modalBody.append(imageElementFront);
modalBody.append(imageElementBack);
modalBody.append(heightElement);
modalBody.append(typesElement);
modalBody.append(abilitiesElement);

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
