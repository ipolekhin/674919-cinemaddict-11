import {EMOJI_SMILES} from "../const";
import {encode} from "he";
import {fullFormatDate} from "../utils/common";
import AbstractSmartComponent from "./abstract-smart-component";

const createCommentsMarkup = (comments) => {
  return comments
    .map((comment) => {
      const {author, emoji, text, date} = comment;
      const formatDate = fullFormatDate(date);

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
  return EMOJI_SMILES
    .map((name) => {
      return (
        `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${name}" value="${name}">
        <label class="film-details__emoji-label" for="emoji-${name}">
          <img src="./images/emoji/${name}.png" alt="emoji" width="30" height="30">
        </label>`
      );
    }).join(`\n`);
};

const createCommentsTemplate = (comments, emoji) => {
  const commentsMarkup = createCommentsMarkup(comments);
  const commentsAddMarkup = createCommentsAddMarkup(comments.length);
  const emojiMarkup = emoji ? `<img src="images/emoji/${emoji}.png" alt="emoji-${emoji}" width="55" height="55">` : ``;

  return (
    `<section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

        <ul class="film-details__comments-list">
          ${commentsMarkup}
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label">${emojiMarkup}</div>

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

const parseFormData = (formData) => {
  return {
    author: `Anonymous`,
    date: new Date(),
    emoji: formData.get(`comment-emoji`),
    id: String(new Date() + Math.random()),
    text: encode(formData.get(`comment`)),
  };
};

export default class Comments extends AbstractSmartComponent {
  constructor(comments) {
    super();
    this._comments = comments;
    this._currentEmojiForComment = null;
    this._deleteButtonClickHandler = null;
    this._addedKeydownHandler = null;
    this._subscribeOnEvent();
    this._userComment = ``;
  }

  getTemplate() {
    return createCommentsTemplate(this._comments, this._currentEmojiForComment);
  }

  reset() {
    const element = this.getElement();
    const emojiLabel = element.querySelector(`.film-details__add-emoji-label img`);
    element.querySelector(`.film-details__comment-input`).value = ``;
    this._userComment = ``;
    if (emojiLabel) {
      emojiLabel.remove();
    }
    if (this._currentEmojiForComment) {
      element.querySelector(`input#emoji-${this._currentEmojiForComment}`).checked = false;
    }
  }

  recoveryListeners() {
    this._subscribeOnEvent();
    this.setDeleteButtonClickHandler(this._deleteButtonClickHandler);
    this.setAddedCommentHandler(this._addedKeydownHandler);
  }

  setDeleteButtonClickHandler(handler) {
    this.getElement().querySelectorAll(`.film-details__comment-delete`)
      .forEach((button, index) => {
        button.addEventListener(`click`, (event) => {
          event.preventDefault();
          handler(event, index);
        });
      });

    this._deleteButtonCLickHandler = handler;
  }

  getData() {
    const form = document.querySelector(`.film-details__inner`);
    const formData = new FormData(form);

    return parseFormData(formData);
  }

  setAddedCommentHandler(handler) {
    // повесил обработчик на компонент комментариев, так как элемент form общий ко всей карточки фильма и собирается в другом компоненте.
    this.getElement().addEventListener(`keydown`, (event) => {
      if (event.key === `Enter` && event.ctrlKey) {
        handler(event);
      }
    });

    this._addedKeydownHandler = handler;
  }

  _subscribeOnEvent() {
    const element = this.getElement();
    const emojiSmilesList = element.querySelector(`.film-details__emoji-list`);
    const commentTextarea = element.querySelector(`.film-details__comment-input`);

    if (this._currentEmojiForComment) {
      const currentEmojiChecked = element.querySelector(`input#emoji-${this._currentEmojiForComment}`);
      currentEmojiChecked.checked = true;
    }

    if (this._userComment) {
      commentTextarea.value = this._userComment;
    }

    commentTextarea.addEventListener(`input`, () => {
      this._userComment = commentTextarea.value;
    });

    emojiSmilesList.addEventListener(`change`, (event) => {
      // event.preventDefault();
      this._currentEmojiForComment = event.target.value;
      this.rerender();
    });
  }
}
