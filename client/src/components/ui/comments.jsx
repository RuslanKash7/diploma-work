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
import { getUserById, getIsLoggedIn } from "../../store/users";
import localStorageService from "../../services/localStorage.service";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const Comments = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadCommentsList(productId));
  }, [dispatch, productId]);

  const currentUserId = localStorageService.getUserId();
  const theUser = useSelector(getUserById(currentUserId));

  const isLoading = useSelector(getCommentsLoadingStatus());

  const comments = useSelector(getComments());
  const isAuth = useSelector(getIsLoggedIn());

  const isBought = (theUser, productId) => {
    // Перебираем массив purchase
    for (const purchase of theUser.purchase) {
      // Перебираем массив userCart в каждом элементе purchase
      for (const item of purchase.userCart) {
        // Проверяем наличие targetProductId
        if (item.productId === productId) {
          return true; // Нашли productId, возвращаем true
        }
      }
    }
    // Если productId не найден
    return false;
  };

  console.log(isBought(theUser, productId));

  const handleSubmit = (data) => {
    dispatch(createComment({ ...data, productId: productId }));
  };

  const handleRemoveComment = (id) => {
    dispatch(removeComment(id));
  };

  const sortedComments = orderBy(comments, ["created_at"], ["desc"]);

  return (
    <>
      {isAuth && isBought(theUser, productId) ? (
        <div className="card mb-2">
          <div className="card-body ">
            <AddCommentForm onSubmit={handleSubmit} />
          </div>
        </div>
      ) : (
        "Вы сможите добавить отзыв после оформления покупки этого товара"
      )}
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
