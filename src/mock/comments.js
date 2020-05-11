import {COMMENT_AUTHORS, COMMENT_TEXTS} from "../mock/const";
import {EMOJI_SMILES} from "../const";
import {getRandomDate, getRandomItem} from "../utils/common";

const START_YEAR = 2020;

const generateComment = () => {
  const commentDate = getRandomDate(new Date(START_YEAR, 0), new Date());

  return {
    author: getRandomItem(COMMENT_AUTHORS),
    date: commentDate,
    emoji: getRandomItem(EMOJI_SMILES),
    text: getRandomItem(COMMENT_TEXTS),
  };
};

const generateComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateComment);
};

export {generateComments};
