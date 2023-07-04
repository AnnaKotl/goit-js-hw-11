import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '38045960-ef970a60611d776386f7db4c1';

const formEl = document.querySelector('.search-form');

formEl.addEventListener('submit', (e) => {
  e.preventDefault();

//   const searchQuery = formEl.searchQuery.value.trim();

//   if (searchQuery === '') {
//     return;
//   }

//   searchImages(searchQuery);
});


