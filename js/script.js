let pokemonRepository = (function() {
	let modalContainer = document.querySelector('#exampleModal');
	let pokemonList = [];
	let apiUrl = 'https://pokeapi.co/api/v2/pokemon/';


	function add(pokemon) {
		if (typeof pokemon === 'object' &&
			Object.keys(pokemon).includes('name') &&
			Object.keys(pokemon).includes('detailsUrl')) {
			pokemonList.push(pokemon)
		} else {
			console.log('This is no pokemon object.');
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
		let pokemonList = document.querySelector('.list-group');
		let listItem = document.createElement('li');
		listItem.setAttribute('role', 'presentation');
		//listItem.classList.add('list-group-item');
		let button = document.createElement('button');
		button.classList.add('pokemon-button', 'btn', 'btn-lg', 'text-center', 'btn-block');
		button.setAttribute('data-toggle', 'modal');
		button.setAttribute('data-target', '#exampleModal');
		button.innerText = pokemon.name;
		listItem.appendChild(button);
		pokemonList.appendChild(listItem);
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
			showModal(item);
		});
	}


	function showModal(item) {
		let modalTitle = $('.modal-title');
		let modalBody = $('.modal-body');
		modalTitle.empty();
		modalBody.empty();
		// Add the new modal content:
		// creating name element for modal title
		let nameElement = $('<h1>' + item.name + '</h1>');
		//creating image elements for modal body
		let imageElementFront = $('<img class="modal-img" style="width:50%">');
		imageElementFront.attr('src', item.imageUrlFront);
		let imageElementBack = $('<img class="modal-img" style="width:50%">');
		imageElementBack.attr('src', item.imageUrlBack);
		// creating elements for height, types and abilities:
		let heightElement = $('<p>' + "height : " + item.height + '</p>');
		let typesElement = $('<p>' + "types : " + item.types + '</p>');
		let abilitiesElement = $('<p>' + "abilities : " + item.abilities + '</p>');
		
		modalTitle.append(nameElement);
		modalBody.append(imageElementFront);
		modalBody.append(imageElementBack);
		modalBody.append(heightElement);
		modalBody.append(typesElement);
		modalBody.append(abilitiesElement);

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
	pokemonRepository.getAll().forEach(function(pokemon) {
		pokemonRepository.addListItem(pokemon);
	});

});
