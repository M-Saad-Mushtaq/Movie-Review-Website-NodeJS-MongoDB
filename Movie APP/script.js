const apiLink = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7d77a796036c350542d08be311196a9b&page=1';
const imgPath = "https://image.tmdb.org/t/p/w1280";
const searchApi = "https://api.themoviedb.org/3/search/movie?&api_key=7d77a796036c350542d08be311196a9b&query=";


const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(apiLink);
function returnMovies(url) {
    fetch(url).then(res => res.json())
    .then(function(data){
        console.log(data.results);
        data.results.forEach(element => {
            const div_card = document.createElement('div');
            div_card.setAttribute('class','card');

            const div_row = document.createElement('div');
            div_row.setAttribute('class','row');

            const div_col = document.createElement('div');
            div_col.setAttribute('class','column');

            const image = document.createElement('img');
            image.setAttribute('id','image');
            image.setAttribute('class','thumbnail');

            const title = document.createElement('h3');
            title.setAttribute('id','title');

            const center = document.createElement('center');

            title.innerHTML = `${element.title}<br><a href="review.html?id=${element.id}&title=${element.title}">Reviews</a>`;
            image.src = imgPath + element.poster_path;

            center.appendChild(image);
            div_card.appendChild(center);
            div_card.appendChild(title);
            div_col.appendChild(div_card);
            div_row.appendChild(div_col);

            main.appendChild(div_row);
        });
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';

    const searchItem = search.value;

    if (searchItem) {
        returnMovies(searchApi + searchItem);
        search.value = "";
    }
});