const URL = `https://api.unsplash.com/photos/random?client_id=McvrzyhY5VI1bgjT8uWsKZpIywG3VrfhN6mT_Z9YCP8&count=28&query=`;

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.header__form');
    const search = form.querySelector('.header__search');
    const imageGallery = document.querySelector('.image-gallery');

    async function getImages(query = '') {
        const res = await fetch(`${URL}${query}`);
        return await res.json();
      }

      function render(data) {
        try {
          data.then(el => {
            el.forEach(({ urls, links }) => {
              const fragment = document.createDocumentFragment();
              
              const a = fragment.appendChild(document.createElement('a'));
              const img = a.appendChild(document.createElement('img'));
              a.classList.add('image-gallery__link');
              img.classList.add('image-gallery__img');
              a.href = links.download;
              a.target = '_blank';
              img.src = urls.regular;
              console.log(urls);
              imageGallery.appendChild(fragment);

              // const img = document.createElement('img');
              // const a = document.createElement('a');
    
              // a.classList.add('image-gallery__link');
              // img.classList.add('image-gallery__img');
    
              // a.href = links.download;
              // a.target = '_blank';
              // img.src = urls.small;
    
              // a.append(img);
              // imageGallery.append(a);
            })
          })
        } catch (err) {
          console.error(err);
        }
      }
      render(getImages());

      form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const searchWord = search.value;
        if(searchWord.trim().length > 0) {
            document.querySelectorAll('.image-gallery__link').forEach((el) => el.remove());
            render(getImages(searchWord));
        };
      });
});


