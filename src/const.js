export const ButtonTagType = {
  WATCHLIST: `add-to-watchlist`,
  WATCHED: `mark-as-watched`,
  FAVORITE: `favorite`,
};

export const BUTTON_TAG_NAMES = [
  ButtonTagType.WATCHLIST,
  ButtonTagType.WATCHED,
  ButtonTagType.FAVORITE,
];

export const ButtonType = {
  [ButtonTagType.WATCHLIST]: `Add to watchlist`,
  [ButtonTagType.WATCHED]: `Mark as watched`,
  [ButtonTagType.FAVORITE]: `Mark as favorite`,
};

export const Keys = {
  ESC: `Esc`,
  ESCAPE: `Escape`,
};

export const NavigationType = {
  ALL: `All movies`,
  WATCHLIST: `Watchlist`,
  HISTORY: `History`,
  FAVORITES: `Favorites`,
  STATS: `Stats`,
};

export const NAVIGATION_NAMES = [
  NavigationType.ALL,
  NavigationType.WATCHLIST,
  NavigationType.HISTORY,
  NavigationType.FAVORITES,
  NavigationType.STATS,
];

export const NavigationTagsType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
  STATS: `stats`,
};

export const NAVIGATION_TAGS_NAMES = [
  NavigationTagsType.ALL,
  NavigationTagsType.WATCHLIST,
  NavigationTagsType.HISTORY,
  NavigationTagsType.FAVORITES,
  NavigationTagsType.STATS,
];

export const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
};

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};

export const SORT_NAMES = [
  SortType.DEFAULT,
  SortType.DATE,
  SortType.RATING,
];

export const GENRE_NAMES = [
  `Musical`,
  `Western`,
  `Drama`,
  `Comedy`,
  `Cartoon`,
  `Mystery`,
];

export const MonthType = {
  JANUARY: `January`,
  FEBRUARY: `February`,
  MARCH: `March`,
  APRIL: `April`,
  MAY: `May`,
  JUNE: `June`,
  JULE: `July`,
  AUGUST: `August`,
  SEPTEMBER: `September`,
  OCTOBER: `October`,
  NOVEMBER: `November`,
  DECEMBER: `December`,

};

export const COUNTRY_NAMES = [
  `Australia`,
  `France`,
  `Russia`,
  `Spain`,
  `UK`,
  `USA`,
];

export const Mode = {
  DEFAULT: `default`,
  EDIT: `edit`,
};

export const ProfileType = {
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIE_BUFF: `Movie buff`,
};

export const ProfileIntervals = [
  {MIN: 0, MAX: 10},
  {MIN: 10, MAX: 20},
  {MIN: 20, MAX: Infinity},
];

export const PROFILE_RATING = [
  ProfileType.NOVICE,
  ProfileType.FAN,
  ProfileType.MOVIE_BUFF,
];

export const ExtraBlockNames = {
  TOP_RATED: `Top rated`,
  MOST_COMMENTED: `Most commented`,
};

export const EXTRA_BLOCK_NAMES = [
  ExtraBlockNames.TOP_RATED,
  ExtraBlockNames.MOST_COMMENTED,
];

export const AGE_RESTRICTIONS = [
  `18+`
];

export const EmojiType = {
  SMILE: `smile`,
  SLEEPING: `sleeping`,
  PUKE: `puke`,
  ANGRY: `angry`,
};

export const EMOJI_SMILES = [
  EmojiType.SMILE,
  EmojiType.SLEEPING,
  EmojiType.PUKE,
  EmojiType.ANGRY,
];
