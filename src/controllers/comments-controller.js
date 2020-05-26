import {render, remove, replace} from "../utils/render";
import CommentsComponent from "../components/comments";

export const EmptyComment = {

};

export default class CommentsController {
  constructor(container, commentsModel) {
    this._container = container;
    this._commentsModel = commentsModel;
    this._commentsComponent = null;
    this._showedCommetnsControllers = [];
    this._onDataChange = this._onDataChange.bind(this);
  }

  render(commentsId) {
    const comments = commentsId.map((id) => {
      return this._commentsModel.getCommentById(id);
    });

    const oldCommentsComponent = this._commentsComponent;
    this._commentsComponent = new CommentsComponent(comments);

    this._commentsComponent.setDeleteButtonClickHandler((event, index) => {
      event.preventDefault();
      this._onDataChange(comments[index], comments);
    });

    if (oldCommentsComponent) {
      replace(this._commentsComponent, oldCommentsComponent);
    } else {
      render(this._container, this._commentsComponent);
    }
  }

  // _renderComments(commentsId) {
  //   // const newComments = render(this._container, this._commentsComponent);
  //   // this._showedCommetnsControllers = this._showedCommetnsControllers.concat(newComments);
  // }

  _removeComments() {
    // this._showedCommetnsControllers.forEach((commentsController) => commentsController.destroy());
    // this._showedCommetnsControllers = [];
  }

  _updateComments() {
    this._removeComments();
    // this._renderComments(this._commentsModel.getComments());
  }

  _onDataChange(oldData) {
    // Удаление
    this._commentsModel.removeComment(oldData.id);
    this._updateComments(oldData);
  }

  destroy() {
    remove(this._commentsComponent);
    this._commentsComponent.removeEvents();
  }
}
