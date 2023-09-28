const URL = `https://api.unsplash.com/search/photos?query=spring&per_page=30&orientation=landscape&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`;


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.header__form');
    const search = form.querySelector('.header__search');
    const imageGallery = document.querySelector('.image-gallery');

    async function getImages() {
        const res = await fetch(URL);
        const data = await res.json();
        console.log(data.results);
      }
});
