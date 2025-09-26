const form = document.getElementById("search-anime");
const input = document.getElementById("input-anime");
const div = document.getElementById("content");
const url = 'https://api.jikan.moe/v4/anime?q=';

async function animesAleatorios() {
    const promisses = [];
    for (let i = 0; i < 16; i++) {
        promisses.push(fetch('https://api.jikan.moe/v4/random/anime').then(res => res.json()).then(data => data.data));
    }
    animes = await Promise.all(promisses)
    renderizarAnimes(animes);
}

document.addEventListener('DOMContentLoaded', () => {
    if (!input.value) {
        animesAleatorios();
    }
});

form.addEventListener('submit', async function (event) {
    const query = input.value.trim().toLowerCase();

    event.preventDefault();

    const response = await fetch(url + query);
    if (!response.ok) {
        throw new Error("Anime não encontrado!");
    }
    const data = await response.json()
    const animes = data.data
    renderizarAnimes(animes);

});

function renderizarAnimes(animes) {
    div.innerHTML = '';
    animes.forEach(anime => {
        const card = `
            <div class="col-md-3">
                <a href="" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#modal-${anime.mal_id}">
                <div class="card h-100 shadow shadow-lg">
                    <img src="${anime.images.jpg.image_url}" class="card-img-top" alt="${anime.title}">
                    <div class="card-body">
                        <h5 class="card-title">${anime.title}</h5>
                        <p class="card-text text-dark">
                            ${anime.synopsis ? anime.synopsis.substring(0, 100) + "..." : "Sem sinopse disponível."}
                        </p>
                    </div>
                </div>
                </a>
            </div>

            <div class="modal fade" id="modal-${anime.mal_id}" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">${anime.title}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p><strong>Synopsis:</strong> ${anime.synopsis}</p>
                    <p><strong>Year:</strong> ${anime.year}</p>
                    <p><strong>Rating:</strong> ${anime.rating}</p>
                    <p><strong>Episodes:</strong> ${anime.episodes}</p>
                    <p><strong>Score:</strong> ${anime.score}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>
        `;
        div.innerHTML += card;
    });
}