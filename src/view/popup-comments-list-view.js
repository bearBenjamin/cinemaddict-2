import { createElement } from '../render.js';
import { humanizeDateComment } from '../utils.js';

const getMessagesUsers = (ids, comments) => {
  const messages = [];
  for (let i = 0; i < ids.length; i += 1) {
    comments.forEach((comment, index) => {
      if (comment.id === ids[i]) {
        messages.push(comments[index]);
      }
    });
  }
  return messages;
};

const createListUserMessages = (messages) => {
  const list = [];
  for (let i = 0; i < messages.length; i += 1) {
    const { author, comment, date, emotion } = messages[i];
    const item = `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${emotion}" width="55" height="55" alt="emoji-smile">
            </span>
            <div>
              <p class="film-details__comment-text">${comment}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${humanizeDateComment(date)}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`;
    list.push(item);
  }
  return list;
};

const createPopupCommentsListTemplate = (ids, comments) => {
  const messages = getMessagesUsers(ids, comments);

  const templateUserMessages = createListUserMessages(messages);

  const result = `<section class="film-details__comments-wrap">
  <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${messages.length}</span></h3>
  <ul class="film-details__comments-list">${templateUserMessages.join('')}</ul>
  <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
  </section>`;
  return result;
};


export default class PopupCommentsListView {
  #element = null;
  #ids = null;
  #comments = null;

  constructor (ids, comments) {
    this.#ids = ids;
    this.#comments = comments;
  }

  get template() {
    return createPopupCommentsListTemplate(this.#ids, this.#comments);
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
