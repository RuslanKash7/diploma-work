import { orderBy } from "lodash";
import React, { useEffect } from "react";
import CommentsList, { AddCommentForm } from "../common/comments";
import {
  createComment,
  getComments,
  getCommentsLoadingStatus,
  loadCommentsList,
  removeComment,
} from "../../store/comments";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const Comments = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCommentsList(productId));
  }, [dispatch, productId]);
  const isLoading = useSelector(getCommentsLoadingStatus());

  const comments = useSelector(getComments());

  const handleSubmit = (data) => {
    dispatch(createComment({ ...data, productId: productId }));
  };

  const handleRemoveComment = (id) => {
    dispatch(removeComment(id));
  };

  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

  return (
    <>
      <div className="card mb-2">
        <div className="card-body ">
          <AddCommentForm onSubmit={handleSubmit} />
        </div>
      </div>
      {sortedComments.length > 0 && (
        <div className="card mb-3">
          <div className="card-body ">
            <h2>Отзывы</h2>
            <hr />
            {!isLoading ? (
              <CommentsList
                comments={sortedComments}
                onRemove={handleRemoveComment}
              />
            ) : (
              "loading..."
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
