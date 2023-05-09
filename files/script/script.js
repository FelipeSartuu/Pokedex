// Cria um objeto com os elementos do tipo pokemon e seus respectivos caminhos de imagem
const pokeElements = {
    normal: "files/image/normal.png",
    flying: "files/image/fly.png",
    fire: "files/image/fogo.png",
    water: "files/image/agua.png",
    bug: "files/image/bug.png",
    dragon: "files/image/dragao.png",
    electric: "files/image/eletric.png",
    fairy: "files/image/fada.png",
    steel: "files/image/metal.png",
    psychic: "files/image/psychic.png",
    fighting: "files/image/fighting.png",
    poison: "files/image/poison.png",
    rock: "files/image/rock.png",
    ground: "files/image/terra.png",
    ghost: "files/image/fantasma.png",
    dark: "files/image/dark.png",
    ice: "files/image/ice.png",
    grass: "files/image/planta.png",
  };
  
  // Seleciona os elementos do DOM que serão usados na página
  const input = document.querySelector(".input-search");
  const buttonPrev = document.querySelector(".btn-prev");
  const buttonNext = document.querySelector(".btn-next");
  
  // Variável que armazena o número do pokemon a ser exibido
  let searchPokemon = 1;
  
  // Função assíncrona para buscar dados de um pokemon usando a API pokeapi.co
  const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200) {
      const data = await APIResponse.json();
      return data;
    }
  };
  
  // Função assíncrona para renderizar as informações de um pokemon na página
  const renderPokemon = async (pokemon) => {
    // Seleciona os elementos do DOM que serão atualizados com as informações do pokemon
    const pokemonName = document.querySelector(".pokemon-name");
    const pokemonNumber = document.querySelector(".pokemon-number");
    const pokemonImage = document.querySelector(".pokemon-image");
    const elementContainer = document.querySelector(".element");
  
    // Exibe a mensagem "Carregando..." enquanto os dados são buscados da API
    pokemonName.innerHTML = "Carregando...";
    pokemonNumber.innerHTML = "";
  
    // Busca os dados do pokemon na API
    const data = await fetchPokemon(pokemon);
  
    // Verifica se a API retornou os dados corretamente
    if (data) {
      // Exibe a imagem do pokemon na página
      pokemonImage.style.display = "block";
  
      // Remove todas as imagens dos elementos do pokemon da página
      const elementImages = document.querySelectorAll(".element img");
      elementImages.forEach((image) => image.remove());
  
      // Cria uma nova imagem para o primeiro elemento do pokemon e adiciona-a à página
      const firstElementImage = document.createElement("img");
      firstElementImage.classList.add("elements", "first-element");
      elementContainer.appendChild(firstElementImage);
  
      // Verifica se o pokemon tem um ou dois tipos e define as imagens correspondentes
      if (data.types.length === 1) {
        firstElementImage.src = pokeElements[data.types[0].type.name];

      // Caso tenha 2 elementos, será criado uma nova img com a imagem do segundo elemento do pokemon  
      } else if (data.types.length === 2) {
        const secondElementImage = document.createElement("img");
        secondElementImage.classList.add("elements", "second-element");
        elementContainer.appendChild(secondElementImage);
  
      // Selecionando as devidas imagens respectivas de acordo com o elemento do pokemon fornecido pela api
        firstElementImage.src = `${pokeElements[data.types[0].type.name]}`;
        secondElementImage.src = `${pokeElements[data.types[1].type.name]}`;
    }

    // Define o nome, número e imagem do pokemon na página com base nos dados recebidos da API
    document.querySelector(".pokemon-name").innerHTML = data.name
    document.querySelector(".pokemon-number").innerHTML = data.id
    document.querySelector(".pokemon-image").src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]
    searchPokemon = data.id
    input.value = ""
    } else {
        document.querySelector(".pokemon-image").style.display = "none"
        document.querySelector(".pokemon-name").innerHTML = "Não encontrado :("
        document.querySelector(".pokemon-number").innerHTML = ""
        input.value = ""
    }
}
    

// Seleciona o formulário na página e adiciona um evento de "submit" que chama a função renderPokemon com o valor do input como parâmetro
const form = document.querySelector(".form").addEventListener("submit", (e) => {
    e.preventDefault()
    renderPokemon(input.value.toLowerCase())
})

// Adicionando um evento "click" no botão de "prev" que atualiza a variável "searchPokemon" que vai pegar o id do pokemon atual e subtrair 1, fazendo com que ao clicar no botão de "Prev", volte 1 número. Isso acontecerá somente se o id for maior que 1
buttonPrev.addEventListener("click", () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    }
})

// Adicionando um evento de "click" no  botão de "Next" que atualiza a variável "searchPokemon" que vai pegar o id do pokemon atual e somar 1, fazendo com que ao clicar no botão "Next", avance 1 id de pokemon.
buttonNext.addEventListener("click", () => {
    searchPokemon += 1
    renderPokemon(searchPokemon)
})

// Fazendo com que ao entrar na página, o primeiro pokemon da pokedex já esteja pré-selecionado.
renderPokemon("1")