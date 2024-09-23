document.getElementById('search-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value.toLowerCase();
    const url = 'https://imdb188.p.rapidapi.com/api/v1/getWeekTop10';
const options = {
method: 'GET',
headers: {
'x-rapidapi-key': 'a0b61510demsh0d6eb957075fe0bp134fe2jsnb8530ed3bb0e',
'x-rapidapi-host': 'imdb188.p.rapidapi.com'
}
};


    try {
        const response = await fetch(url, options);
        const finalResponse = await response.json();
        // console.log(finalResponse)
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = ''; // Clear previous results

        const result = finalResponse.data.filter(movie => {
            // console.log(movie)
            return(movie.originalTitleText.text.toLowerCase().includes(query))
        });
        console.log(result, "hello")

        result.forEach(movie => {
            const col = document.createElement('div');
            col.classList.add('col-md-4');

            const card = document.createElement('div');
            card.classList.add('card', 'movie-card');

            const img = document.createElement('img');
            // img.src = movie.primaryImage ? movie.primaryImage.imageUrl : 'https://via.placeholder.com/200';
            img.src = movie.primaryImage.imageUrl;
            img.alt = movie.originalTitleText.text;
            card.appendChild(img);

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const title = document.createElement('h5');
            title.textContent = movie.originalTitleText.text;
            cardBody.appendChild(title);

            if (movie.releaseDate) {
                const releaseDate = document.createElement('p');
                releaseDate.textContent = `Release Date: ${movie.releaseDate.year}`;
                cardBody.appendChild(releaseDate);
            }

            if (movie.rating) {
                const rating = document.createElement('p');
                rating.textContent = `Rating: ${movie.rating.aggregateRating}`;
                cardBody.appendChild(rating);
            }

            if (movie.isAdult) {
                const adult = document.createElement('p');
                adult.textContent = 'Adult Content';
                adult.classList.add('text-danger');
                cardBody.appendChild(adult);
            }

            card.appendChild(cardBody);
            col.appendChild(card);
            resultsContainer.appendChild(col);
        });
    } catch (error) {
        console.error(error);
    }
});