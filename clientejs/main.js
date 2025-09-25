const form = document.getElementById("search-anime");
const input = document.getElementById("input-anime");
const div = document.getElementById("content");

form.addEventListener('submit', async function (event) {
    event.preventDefault();
    const query = input.ariaValueMax.trim().toLowerCase();
    try {
        const response = await fetch(`https://anime-facts-rest-api.herokuapp.com/api/v1/${query}`);
        if (!response.ok) {
            throw new Error("Pokémon não encontrado!");
        }
        const data = await response.json()
        console.log(data)
        // result.innerHTML = `
        //     <div class="card">
        //         <h2 class="card-title">${data.name.toUpperCase()}</h2>
        //         <img src="${data.sprites.front_default}" alt="${data.name}">
        //         <p>Peso: ${data.weight}</p>
        //         <p>Altura: ${data.height}</p>
        //     </div>
        // `;
    } catch (error) {
        console.error(error.message);
    }

});