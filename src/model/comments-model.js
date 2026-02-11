export default class CommentModel {
  #comments = [];

  constructor(comments) {
    this.#comments = comments;
  }

  getComments = () => this.#comments;
}
