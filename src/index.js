import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '38045960-ef970a60611d776386f7db4c1';

const formEl = document.querySelector('.search-form');
const galleryEl = document.querySelector('.gallery');

const loadMoreButton = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a');

let searchQuery = '';
let page = 1;

formEl.addEventListener('submit', onSearch);
loadMoreButton.addEventListener('click', onLoadMore);

async function onSearch(e) {
  e.preventDefault();

  searchQuery = e.target.elements.searchQuery.value.trim();
  page = 1;

  clearGallery();

  if (!searchQuery) {
    return;
  }

  await fetchImages();
};

async function onLoadMore() {
  page++;

  await fetchImages();
};

async function fetchImages() {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 40
      }
    });

    const { hits, totalHits } = response.data;

    if (hits.length > 0) {
      displayImages(hits);

      if (hits.length === 40) {
        showLoadMoreButton();
      } else {
        hideLoadMoreButton();
      }
    } else {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }

    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);

  } catch (error) {
    console.error(error);
    Notiflix.Notify.failure('An error occurred while fetching images. Please try again later.');
  }
};

function displayImages(images) {
  const cards = images.map(createImageCard);
  galleryEl.insertAdjacentHTML('beforeend', cards.join(''));

  lightbox.refresh();
};

function createImageCard({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
  return `
    <div class="photo-card">
      <a href="${largeImageURL}">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${likes}</p>
        <p class="info-item"><b>Views:</b> ${views}</p>
        <p class="info-item"><b>Comments:</b> ${comments}</p>
        <p class="info-item"><b>Downloads:</b> ${downloads}</p>
      </div>
    </div>
  `;
};

function clearGallery() {
  galleryEl.innerHTML = '';
};

function showLoadMoreButton() {
  loadMoreButton.style.display = 'block';
};

function hideLoadMoreButton() {
  loadMoreButton.style.display = 'none';
};
