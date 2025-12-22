import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { buscarAnimes, animesAleatorios } from "./api.js";

const form = document.getElementById("search-anime");
export const input = document.getElementById("input-anime");
export const div = document.getElementById("content");

if (!input.value) {
    document.addEventListener('DOMContentLoaded', () => {
    animesAleatorios();
});
}

form.addEventListener('submit', async function (event) {
    event.preventDefault();
    buscarAnimes()
});

export function renderizarAnimes(animes) {
    // Filtragem de conteúdo +18, não quero perder pontos por isso.
    const podeNaoMan = ["Hentai", "R-18", "Nudity"];

    const filtrados = animes.filter(anime => {
        return !podeNaoMan.some(palavra => {
            const regex = new RegExp(`\\b{palavra}\\b`, "i");
            return regex.test(anime.rating || "");
        });
    });

    filtrados.forEach(anime => {
        function card() {
          return <>
            <div className="col-sm-12 col-md-6 col-lg-3">
                <a href="" className="text-decoration-none" data-bs-toggle="modal" data-bs-target="#modal-{anime.mal_id}">
                <div className="card h-100 shadow shadow-lg">
                    <img src="{anime.images.jpg.image_url}" className="card-img-top h-100 object-fit-cover" alt="{anime.title}">
                    <div className="card-body">
                        <h5 className="card-title">{anime.title}</h5>
                        <p className="card-text text-dark">
                            {anime.synopsis ? anime.synopsis.substring(0, 100) + "..." : "Sem sinopse disponível."}
                        </p>
                    </div>
                </div>
                </a>
            </div>

            <div className="modal fade" id="modal-{anime.mal_id}" tabindex="-1" aria-hidden="true">
              <div className="modal-dialog modal-lg modal-dialog-centered">
                  <div className="modal-content">
                  <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">{anime.title}</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                      <p><strong>Synopsis:</strong> {anime.synopsis}</p>
                      <div className="d-flex flex-wrap gap-4">
                          <p className="text-nowrap mb-0"><strong>Rank:</strong> {anime.rank}</p>
                          <p className="text-nowrap mb-0"><strong>Year:</strong> {anime.year}</p>
                          <p className="text-nowrap mb-0"><strong>Status:</strong> {anime.status}</p>
                          <p className="text-nowrap mb-0"><strong>Rating:</strong> {anime.rating}</p>
                          <p className="text-nowrap mb-0"><strong>Episodes:</strong> {anime.episodes}</p>
                          <p className="text-nowrap mb-0"><strong>Duration:</strong> {anime.duration}</p>
                          <p className="text-nowrap mb-0"><strong>Popularity:</strong> {anime.popularity}</p>
                          <p className="text-nowrap mb-0"><strong>Score:</strong> {anime.score}</p>
                          <a href="{anime.url}"></a>
                      </div>
                  </div>
                  <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                  </div>
              </div>
            </div>
          </>
        }
        div.innerHTML += card;
    });
}