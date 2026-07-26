// Variavel global que guarda a lista que vem do JSON
let todosOsFilmes = [];

// Função para buscar filmes do JSON
fetch('filmes.json').then(response => response.json()).then(filmes => {
  // Colocar filmes em ordem alfabética
  filmes.sort((a, b) => a.titulo.localeCompare(b.titulo));
  
  // Salva os filmes na variável global
  todosOsFilmes = filmes;
  
  // Array de filmes e chamar a função de desenhar na tela
  exibirFilmes(filmes);
});

function exibirFilmes(listaDeFilmes) {
  const container = document.getElementById('catalogo');
  container.innerHTML = ''; // Limpa a tela antes de desenhar
  
  // Se não encontrar nenhum filme
  if (listaDeFilmes.length === 0) {
    container.innerHTML = `
    <p style="grid-column: 1/-1; text-align: center; color: #aaa; margin-top: 20px;">Nenhum filme foi encontrado com esse nome.</p>
    `;
    return
  }
  
  // Desenha os cards
  listaDeFilmes.forEach(filme => {
    
    const card = `
      <div class="card-filme">
        <img src="${filme.capa}" alt="${filme.titulo} 
          "onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg'">
        <div class="card-filme-info">
          <h3>${filme.titulo}</h3>
          <p>${filme.sinopse}</p>
          <a href="${filme.link}" target="_blank" class="btn-assistir">Assistir Trailer</a>
        </div>
      </div>
    `;
    container.innerHTML += card;
  });
}

// Captura a digitação na barra de pesquisa
const inputBusca = document.getElementById('input-busca');

inputBusca.addEventListener('input', () => {
  const termoBusca = inputBusca.value.toLowerCase(); // Converte o texto para minúsculo
  
  // Filtra os filmes cujo título contenha o texto digitado
  const filmesFiltrados = todosOsFilmes.filter(filme => filme.titulo.toLowerCase().includes(termoBusca));
  
  // Atualiza a tela apenas com os filmes filtrados
  exibirFilmes(filmesFiltrados);
})
