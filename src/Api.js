export default class Api {
  static _getMovies(num = 1) {
    return fetch(`./../static/api/CONTENTLISTINGPAGE-PAGE${num}.json`).then(
      (response) => {
        return response.json();
      }
    );
  }
}
