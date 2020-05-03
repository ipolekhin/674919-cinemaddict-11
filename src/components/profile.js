import {PROFILE_RATING, ProfileIntervals} from "../const";
import {createElement} from "../utils";

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

export default class Profile {
  constructor(statisticHistory) {
    this._statisticHistory = statisticHistory;
    this._element = null;
  }

  getTemplate() {
    return createProfileTemplate(this._statisticHistory);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
