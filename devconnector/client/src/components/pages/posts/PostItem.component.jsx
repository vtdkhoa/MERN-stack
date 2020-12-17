import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import PropTypes from 'prop-types'

const PostItem = ({ post }) => {
  const {
    _id,
    title,
    paragraph,
    date,
    author,
    likes,
    comments,
    user,
    avatar,
    tags
  } = post

  return (
    <div class="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img class="round-img" src={avatar} alt="avatar"/>
          <h4>{author}</h4>
        </Link>
      </div>
      <div>
        <h2>{title}</h2>
        <p class="my-1">{paragraph}</p>
        <p class="post-date">Posted on {moment(date).format('L')}</p>
        <p className="my-1">Tags:&nbsp;
          {tags && tags.slice().map(tag => (
            <span className="badge badge-success">{tag}</span>
          ))}
        </p>
        <button type="button" class="btn btn-light">
          <i class="fas fa-thumbs-up"></i>&nbsp;
          <span>{likes.length}</span>
        </button>
        <Link to={`/post/${_id}`} class="btn btn-primary">
          Discussion <span class='comment-count'>{comments.length}</span>
        </Link>
        <button type="button" class="btn btn-danger">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
  )
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired
}

export default PostItem