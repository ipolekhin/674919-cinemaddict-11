// import {EmojiType} from "../const";
// import {render, replace} from "../utils/render";

export default class FilterController {
  constructor(container, commentsModel) {
    this._container = container;
    this._commentsModel = commentsModel;

    this._onDataChange = this._onDataChange.bind(this);

    this._container.setDataChangeHandler(this._onDataChange);
  }

  render() {
    // const container = this._container;
    // const allComments = this._commentsModel.getComments();
  }

  _onDataChange() {
    this.render();
  }
}
