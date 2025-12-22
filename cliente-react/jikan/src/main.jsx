import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import React from 'react';

import { buscarAnimes, animesAleatorios } from "./api.jsx";

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
    // Limpa a div antes de renderizar novos resultados
    div.innerHTML = "";

    const podeNaoMan = ["Hentai", "R-18", "Nudity"];

    const filtrados = animes.filter(anime => {
        return !podeNaoMan.some(palavra => {
            // Correção da Regex: adicionado o $ para interpolar a variável
            const regex = new RegExp(`\\b${palavra}\\b`, "i");
            return regex.test(anime.rating || "");
        });
    });

    filtrados.forEach(anime => {
        // Transformado em Template String (usando crases ` `)

        const AnimeCard = ({ anime }) => {
            return (
                <>
                    {/* Card que aciona o Modal */}
                    <div className="col-sm-12 col-md-6 col-lg-3 mb-4">
                        <a
                            href="#!"
                            className="text-decoration-none"
                            data-bs-toggle="modal"
                            data-bs-target={`#modal-${anime.mal_id}`}
                        >
                            <div className="card h-100 shadow shadow-lg">
                                <img
                                    src={anime.images.jpg.image_url}
                                    className="card-img-top h-100 object-fit-cover"
                                    alt={anime.title}
                                />
                                <div className="card-body">
                                    <h5 className="card-title text-dark">{anime.title}</h5>
                                    <p className="card-text text-muted">
                                        {anime.synopsis
                                            ? `${anime.synopsis.substring(0, 100)}...`
                                            : "Sem sinopse disponível."}
                                    </p>
                                </div>
                            </div>
                        </a>
                    </div>

                    {/* Estrutura do Modal */}
                    <div
                        className="modal fade"
                        id={`modal-${anime.mal_id}`}
                        tabIndex="-1"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog modal-lg modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5">{anime.title}</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body text-dark">
                                    <p><strong>Synopsis:</strong> {anime.synopsis || "N/A"}</p>
                                    <div className="d-flex flex-wrap gap-4">
                                        <p className="text-nowrap mb-0"><strong>Rank:</strong> {anime.rank || "N/A"}</p>
                                        <p className="text-nowrap mb-0"><strong>Year:</strong> {anime.year || "N/A"}</p>
                                        <p className="text-nowrap mb-0"><strong>Status:</strong> {anime.status || "N/A"}</p>
                                        <p className="text-nowrap mb-0"><strong>Rating:</strong> {anime.rating || "N/A"}</p>
                                        <p className="text-nowrap mb-0"><strong>Episodes:</strong> {anime.episodes || "N/A"}</p>
                                        <p className="text-nowrap mb-0"><strong>Score:</strong> {anime.score || "N/A"}</p>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            );
        };


        div.innerHTML += animeHTML;
    });
}