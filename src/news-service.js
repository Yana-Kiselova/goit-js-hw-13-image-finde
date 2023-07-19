export default class NewApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  pictureRequest() {
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=38060547-c8a3d7858038d11f3ac520262`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        this.incrementPage();

        return data.hits;
      });
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  setSearchQuery(data) {
    this.searchQuery = data;
  }
}
