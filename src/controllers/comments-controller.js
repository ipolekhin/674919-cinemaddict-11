import {render, remove, replace} from "../utils/render";
import CommentsComponent from "../components/comments";

export default class CommentsController {
  constructor(container, commentsModel) {
    this._container = container;
    this._commentsModel = commentsModel;
    this._commentsComponent = null;
  }

  render(commentsId, onDelete, addId) {
    const comments = commentsId.map((id) => {
      return this._commentsModel.getCommentById(id);
    });

    const oldCommentsComponent = this._commentsComponent;
    this._commentsComponent = new CommentsComponent(comments);

    this._commentsComponent.setDeleteButtonClickHandler((commendId) => {
      this._onDataChange(commendId, null);
      onDelete(commendId);
    }, comments);

    this._commentsComponent.setAddedCommentHandler((data) => {
      this._onDataChange(null, data);
      addId(data.id);
    });

    if (oldCommentsComponent) {
      replace(this._commentsComponent, oldCommentsComponent);
    } else {
      render(this._container, this._commentsComponent);
    }
  }

  _addComment(comment) {
    this._commentsModel.addComment(comment);
  }

  _removeComment(comment) {
    this._commentsModel.removeComment(comment.id);
  }

  resetForm() {
    this._commentsComponent.reset();
  }

  _onDataChange(oldData, newData) {
    if (oldData === null) {
      this._addComment(newData);
    } else {
      this._removeComment(oldData);
    }
  }

  destroy() {
    remove(this._commentsComponent);
    this._commentsComponent.removeEvents();
  }
}
