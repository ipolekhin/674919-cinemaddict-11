const FILM_QUANTITY = 2;

const collectTopFilms = (films) => {
  let max = 0;
  return films.reduce((result, film) => {
    const {rating} = film;
    if (rating > max) {
      max = rating;
      result.unshift(film);
    }
    if (result.length > FILM_QUANTITY) {
      result.pop();
    }
    return result;
  }, []);
};

const collectMostCommentedFilms = (films) => {
  let max = 0;
  return films.reduce((result, film) => {
    const {comments} = film;
    if (comments > max) {
      max = comments;
      result.unshift(film);
    }
    if (result.length > FILM_QUANTITY) {
      result.pop();
    }
    return result;
  }, []);
};

const getExtraBlocksFilms = (films) => {
  const topFilms = collectTopFilms(films);
  const mostCommentedFilms = collectMostCommentedFilms(films);

  return {
    'Top rated': topFilms,
    'Most commented': mostCommentedFilms,
  };
};

export {getExtraBlocksFilms};
