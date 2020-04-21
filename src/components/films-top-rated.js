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

const getTopRatedFilms = (films) => {
  const topFilms = collectTopFilms(films);
  console.log(topFilms.length);

  return topFilms;
};

export {getTopRatedFilms};
