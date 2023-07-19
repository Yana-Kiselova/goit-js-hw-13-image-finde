import debounce from 'lodash.debounce';
import templates from './templates/country-card.hbs';
import NewApiService from './news-service';

// ========= Выносим ссылки на элементы в функцию =========

const inputEl = document.querySelector('.input');
const galleryEl = document.querySelector('.js-gallery');
const buttonEl = document.querySelector('.button');

const newApiService = new NewApiService();

inputEl.addEventListener('input', debounce(imageName, 500));
buttonEl.addEventListener('click', loadMore);

function imageName(e) {
  if (e.target.value.trim() === '') {
    galleryEl.innerHTML = '';
    buttonEl.classList.add('hidebutton');
    return;
  }
  newApiService.setSearchQuery(e.target.value);
  newApiService.pictureRequest().then(data => {
    if (data.length === 0) {
      return alert('Проверте правильность введения');
    }
    console.log(data);
    appendImgMarkup(data);
  });
}
// ========= Создаем разметку галереи по шаблону =========
function appendImgMarkup(hits) {
  galleryEl.insertAdjacentHTML('beforeend', templates(hits));
  buttonEl.classList.remove('hidebutton');
}
// ========= дополняем разметку галереи по шаблону при клике на кнопку =========
function loadMore() {
  if (newApiService.searchQuery.trim() === '') {
    buttonEl.classList.add('hidebutton');
    return alert('Проверте правильность введения');
  }
  newApiService.pictureRequest().then(data => {
    console.log(data).catch(err => {
      console.log(err);
    });
    appendImgMarkup(data);
  });
  // const element = document.getElementById('.js-gallery');
  // element.scrollIntoView({
  //   behavior: 'smooth',
  //   block: 'end',
  // });
}

// когда ошибка ввода и нажать кнопку, приходят пустые массивы
