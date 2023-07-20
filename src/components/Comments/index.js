import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
const initialCommentsList = []
class Comments extends Component {
  state = {
    commentsList: initialCommentsList,
    username: '',
    comment: '',
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()
    const {username, comment} = this.state

    const initialBackgroundColorClassName =
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]

    const newComment = {
      id: uuidv4(),
      username,
      comment,
      commentTime: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      username: '',
      comment: '',
    }))
  }

  onLikeToggle = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onDeleteComment = id => {
    const {commentsList} = this.state

    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== id),
    })
  }

  render() {
    const {commentsList, username, comment} = this.state
    return (
      <div className="container">
        <h1 className="heading">Comments</h1>
        <div className="comment-container">
          <form className="comment-form-container" onSubmit={this.onAddComment}>
            <p className="label">Say something about 4.0 Technologies</p>
            <input
              type="text"
              className="input"
              placeholder="Your Name"
              value={username}
              onChange={this.onChangeUserName}
            />
            <textarea
              className="textarea"
              placeholder="Your Comment"
              value={comment}
              onChange={this.onChangeComment}
            />
            <button type="submit" className="submit-btn">
              Add Comment
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            className="comment-img"
            alt="comments"
          />
        </div>
        <p className="comment-count">
          <span className="count">{commentsList.length}</span> Comments
        </p>
        <ul className="comment-list-container">
          {commentsList.map(eachComment => (
            <CommentItem
              commentsList={eachComment}
              onLikeToggle={this.onLikeToggle}
              onDeleteComment={this.onDeleteComment}
              key={eachComment.id}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments
