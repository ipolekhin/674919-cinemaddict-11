import {COMMENT_AUTHORS, COMMENT_TEXTS} from "../mock/const";
import {EMOJI_SMILE} from "../const";
import {getRandomDate, getRandomItem} from "../utils";

const START_YEAR = 2020;

const generateComment = () => {
  const commentDate = getRandomDate(new Date(START_YEAR, 0), new Date());

  return {
    author: getRandomItem(COMMENT_AUTHORS),
    emoji: getRandomItem(EMOJI_SMILE),
    text: getRandomItem(COMMENT_TEXTS),
    date: commentDate,
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComments};