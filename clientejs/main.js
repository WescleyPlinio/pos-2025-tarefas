const form = document.getElementById("search-anime");
const input = document.getElementById("input-anime");
const div = document.getElementById("content");
const url = 'https://api.jikan.moe/v4/anime?q=';

async function animesAleatorios() {
    const spinner = document.getElementById('spinner');
    spinner.style.display = "block";
    const promisses = [];
    for (let i = 0; i < 16; i++) {
        promisses.push(fetch('https://api.jikan.moe/v4/random/anime').then(res => res.json()).then(data => data.data));
    }
    animes = await Promise.all(promisses)
    renderizarAnimes(animes);
    spinner.style.display = "none";
}

if (!input.value) {
    document.addEventListener('DOMContentLoaded', () => {
    animesAleatorios();
});
}

form.addEventListener('submit', async function (event) {
    event.preventDefault();
    div.innerHTML = '';

    const query = input.value.trim().toLowerCase();
    if (!query) {return;}
    const spinner = document.getElementById('spinner');
    spinner.style.display = "block";

    const response = await fetch(url + encodeURIComponent(query));
    if (!response.ok) {
        throw new Error("Anime não encontrado!");
    }
    const data = await response.json()
    const animes = data.data
    renderizarAnimes(animes);
    spinner.style.display = "none";
});

function renderizarAnimes(animes) {
    div.innerHTML = '';

    // Filtragem de conteúdo +18, não quero perder pontos por isso.
    const podeNaoMan = ["Hentai", "R-18", "Nudity"];

    const filtrados = animes.filter(anime => {
        return !podeNaoMan.some(palavra => {
            const regex = new RegExp(`\\b${palavra}\\b`, "i");
            return regex.test(anime.rating || "");
        });
    });

    filtrados.forEach(anime => {
        const card = `
            <div class="col-sm-12 col-md-6 col-lg-3">
                <a href="" class="text-decoration-none" data-bs-toggle="modal" data-bs-target="#modal-${anime.mal_id}">
                <div class="card h-100 shadow shadow-lg">
                    <img src="${anime.images.jpg.image_url}" class="card-img-top h-100 object-fit-cover" alt="${anime.title}">
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
                    <div class="d-flex flex-wrap gap-4">
                        <p class="text-nowrap mb-0"><strong>Rank:</strong> ${anime.rank}</p>
                        <p class="text-nowrap mb-0"><strong>Year:</strong> ${anime.year}</p>
                        <p class="text-nowrap mb-0"><strong>Status:</strong> ${anime.status}</p>
                        <p class="text-nowrap mb-0"><strong>Rating:</strong> ${anime.rating}</p>
                        <p class="text-nowrap mb-0"><strong>Episodes:</strong> ${anime.episodes}</p>
                        <p class="text-nowrap mb-0"><strong>Duration:</strong> ${anime.duration}</p>
                        <p class="text-nowrap mb-0"><strong>Popularity:</strong> ${anime.popularity}</p>
                        <p class="text-nowrap mb-0"><strong>Score:</strong> ${anime.score}</p>
                        <a href="${anime.url}"></a>
                    </div>
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