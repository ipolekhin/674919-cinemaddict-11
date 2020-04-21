import {PROFILE_RATING} from "../const";

const selectProfileRating = (count) => {
  let result = ``;
  if (count >= 1 && count <= 10) {
    result = PROFILE_RATING[0];
  } else if (count >= 11 && count <= 20) {
    result = PROFILE_RATING[1];
  } else if (count >= 21) {
    result = PROFILE_RATING[2];
  }
  console.log(result);
  return result;
};

const createProfileTemplate = (statistic) => {
  const profileRating = selectProfileRating(statistic.count);
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${profileRating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export {createProfileTemplate};
