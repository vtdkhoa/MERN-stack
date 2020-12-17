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
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="avatar"/>
          <h4>{author}</h4>
        </Link>
      </div>
      <div>
        <h2>{title}</h2>
        <p className="my-1">{paragraph}</p>
        <p className="post-date">Posted on {moment(date).format('L')}</p>
        <p classNameName="my-1">Tags:&nbsp;
          {tags && tags.slice().map((tag, index) => (
            <span key={index} classNameName="badge badge-success">{tag}</span>
          ))}
        </p>
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-up"></i>&nbsp;
          <span>{likes.length}</span>
        </button>
        <Link to={`/post/${_id}`} className="btn btn-primary">
          Discussion <span className='comment-count'>{comments.length}</span>
        </Link>
        <button type="button" className="btn btn-danger">
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  )
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired
}

export default PostItem