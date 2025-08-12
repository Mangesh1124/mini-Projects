const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const showResult = document.getElementById('show-result');
const showMoreBtn = document.getElementById('show-more-btn');

const accessKey = "2pUNmS83gDPDnNN1eJ8tDV4X76bt_IK86JSL8tPGRkA"

let page = 1;
let keyword = '';

async function searchImages() {
    keyword = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?query=${keyword}&page=${page}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();
    if (page === 1){
        showResult.innerHTML = '';
        showMoreBtn.style.display = 'none';
    }

    const results = data.results;
    results.map((result) => {
        const image = document.createElement('img');
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        showResult.appendChild(imageLink);

    })
    showMoreBtn.style.display = 'block';

}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
})

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
})