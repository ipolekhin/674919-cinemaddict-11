import {PROFILE_RATING, ProfileIntervals} from "../const";

const selectProfileRating = (count) => {
  const indexProfile = ProfileIntervals.findIndex((interval) =>
    (count > interval.MIN && count <= interval.MAX));

  return PROFILE_RATING[indexProfile];
};

const createProfileTemplate = (statisticHistory) => {
  const profileRating = selectProfileRating(statisticHistory);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${profileRating}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export {createProfileTemplate};
