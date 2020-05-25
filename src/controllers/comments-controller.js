import {render} from "../utils/render";
import CommentsComponent from "../components/comments";

export default class CommentsController {
  constructor(container, commentsModel) {
    this._container = container;
    this._commentsModel = commentsModel;
    this._commentComponent = null;
    this._showedCommentsControllers = [];

    this._onDataChange = this._onDataChange.bind(this);

    // this._container.setDataChangeHandler(this._onDataChange);
  }

  render(commentsId) {
    const comments = commentsId.map((id) => {
      return this._commentsModel.getCommentById(id);
    });

    this._commentComponent = new CommentsComponent(comments);
    render(this._container, this._commentComponent);
  }

  _onDataChange() {
    this.render();
  }
}
