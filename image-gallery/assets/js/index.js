const URL = `https://api.unsplash.com/photos/random?client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo&count=30&query=''`;


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.header__form');
    const search = form.querySelector('.header__search');
    const imageGallery = document.querySelector('.image-gallery');

    async function getImages() {
        const res = await fetch(URL);
        return await res.json();
      }

      function render(data) {
        try {
          data.then(el => {
            el.forEach(({ urls, links }) => {
              const img = document.createElement('img');
              const a = document.createElement('a');
    
              a.classList.add('image-gallery__link');
              img.classList.add('image-gallery__img');
    
              a.href = links.download;
              a.target = '_blank';
              img.src = urls.small;
    
              a.append(img);
              imageGallery.append(a);
            })
          })
        } catch (error) {
          console.error(error)
        }
      }
      render(getImages());
});


