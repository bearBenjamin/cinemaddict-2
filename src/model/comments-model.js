export default class CommentModel {
  #comments = [];

  constructor(comments) {
    this.#comments = comments;
  }

  get comments () {
    return this.#comments;
  }

}
