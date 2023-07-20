// Write your code here
import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {commentsList, onLikeToggle, onDeleteComment} = props
  const {
    id,
    username,
    comment,
    commentTime,
    isLiked,
    initialClassName,
  } = commentsList

  const onClickLikeIcon = () => {
    onLikeToggle(id)
  }

  const onClickDeleteIcon = () => {
    onDeleteComment(id)
  }

  const likeImage = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const likedClass = isLiked ? 'liked' : ''

  return (
    <li className="comments-list-item">
      <div className="comment-details-container">
        <p className={`user-icon ${initialClassName}`}>
          {username[0].toUpperCase()}
        </p>
        <div className="comment-content-container">
          <p className="username">
            {username}{' '}
            <span className="comment-time">
              {formatDistanceToNow(commentTime)} ago
            </span>
          </p>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="footer-icon-container">
        <button className="button" type="button" onClick={onClickLikeIcon}>
          <img src={likeImage} className="like-icon" alt="like" />{' '}
          <span className={`like-text ${likedClass}`}>Like</span>
        </button>
        <button className="button" type="button" data-testid="delete">
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            className="delete-icon"
            alt="delete"
            onClick={onClickDeleteIcon}
          />
        </button>
      </div>
    </li>
  )
}

export default CommentItem
