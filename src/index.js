import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { findImages } from './api';

const galleryEl = document.querySelector('.gallery');
const fromEl = document.querySelector('#search-form');
const buttonEl = document.querySelector('.load-more');
const inputEl = document.querySelector('input');
let nameImages = '';
let page = 0;
let perPage = 40;
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionsDelay: 250,
  disableScroll: false,
});

fromEl.addEventListener('submit', create);
buttonEl.addEventListener('click', loadMore);

function create(e) {
  nameImages = '';
  page = 0;
  galleryEl.innerHTML = '';
  buttonEl.style.display = 'none'; // Приховуємо кнопку "Load more"
  e.preventDefault();

  nameImages = inputEl.value.trim();
  if (nameImages === '') {
    return Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }

  page = 1;
  findImages(nameImages, perPage, page)
    .then((res) => {
      if (!res.data.hits.length > 0) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else {
        createCards(res);
        buttonEl.classList.remove('hidden'); // Показуємо кнопку "Load more"
        buttonEl.disabled = false;
        hidingBtnLoadMore(res.data.totalHits);
      }
    })
    .catch((error) => {
      Notify.failure(
        'Sorry, there was an error while fetching images. Please try again.'
      );
    });
}

function loadMore(e) {
  e.preventDefault();
  buttonEl.style.display = 'none';
  page++;
  findImages(nameImages, perPage, page)
    .then((res) => {
      if (!res.data.hits.length > 0) {
       
        Notify.failure(
          'Sorry, there are no more images matching your search query.'
        );
      } else {
        
        createCards(res);
        hidingBtnLoadMore(res.data.totalHits);
        lightbox.refresh();
      }
    })
    .catch((error) => {
      Notify.failure(
        'Sorry, there was an error while fetching images. Please try again.'
      );
    });
}

function createCards(arr) {
    buttonEl.style.display = 'block';
  const object = arr.data.hits;
  const card = object
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return ` <div class="photo-card">
          <a class="gallery-link" href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" width="300" height="250" />
          </a>
          <div class="info">
            <p class="info-item">
              <b>Likes</b>
              ${likes}
            </p>
            <p class="info-item">
              <b>Views</b>
              ${views}
            </p>
            <p class="info-item">
              <b>Comments</b>
              ${comments}
            </p>
            <p class="info-item">
              <b>Downloads</b>
              ${downloads}
            </p>
          </div>
        </div> `;
      }
    )
    .join('');

  galleryEl.insertAdjacentHTML('beforeend', card);
}
function hidingBtnLoadMore(total) {
    const comparison = page * perPage < total;
    if (!comparison) {
      buttonEl.style.display = 'none'; // Приховуємо кнопку "Load more";
    } else {
      buttonEl.style.display = 'block'; // Показуємо кнопку "Load more"
    }
  }