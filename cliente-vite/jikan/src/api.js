import { renderizarAnimes, input, div } from "./main.js";

const url = 'https://api.jikan.moe/v4/anime?q=';

export async function animesAleatorios() {
    const spinner = document.getElementById('spinner');
    spinner.style.display = "block";
    const promisses = [];
    for (let i = 0; i < 16; i++) {
        promisses.push(fetch('https://api.jikan.moe/v4/random/anime').then(res => res.json()).then(data => data.data));
    }
    const animes = await Promise.all(promisses)
    renderizarAnimes(animes);
    spinner.style.display = "none";
}

export async function buscarAnimes() {
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
}