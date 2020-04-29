import {castTimeFormat} from "../utils";
import {EMOJI_SMILE} from "../const";
import {generateComments} from "../mock/comments";

const formattedDate = (value) => {
  const year = value.getUTCFullYear();
  const month = castTimeFormat(value.getMonth() + 1);
  const date = castTimeFormat(value.getDate());
  const hours = castTimeFormat(value.getHours() % 24);
  const minutes = castTimeFormat(value.getMinutes());

  return `${year}/${month}/${date} ${hours}:${minutes}`;
};

const createCommentsMarkup = (comments) => {
  return comments
    .map((comment) => {
      const {author, emoji, text, date} = comment;
      const formatDate = formattedDate(date);

      return (
        `<li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/${emoji}.png" alt="emoji-smile" width="55" height="55">
          </span>
          <div>
            <p class="film-details__comment-text">${text}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${author}</span>
              <span class="film-details__comment-day">${formatDate}</span>
              <button class="film-details__comment-delete">Delete</button>
            </p>
          </div>
        </li>`
      );
    })
    .join(`\n`);
};

const createCommentsAddMarkup = () => {
  return EMOJI_SMILE
    .map((name) => {
      return (
        `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${name}" value="${name}">
        <label class="film-details__emoji-label" for="emoji-${name}">
          <img src="./images/emoji/${name}.png" alt="emoji" width="30" height="30">
        </label>`
      );
    });
};

const createCommentsTemplate = (comments) => {
  const commentsMarkup = createCommentsMarkup(comments);
  const commentsAddMarkup = createCommentsAddMarkup(comments.length);

  return (
    `<section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
          ${commentsMarkup}
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            ${commentsAddMarkup}
          </div>
        </div>
      </section>`
  );
};

export {createCommentsTemplate};
