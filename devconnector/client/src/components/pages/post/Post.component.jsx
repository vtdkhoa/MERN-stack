import React, { Fragment, useEffect } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPost } from '../../../actions/post'
import PropTypes from 'prop-types'
import Spinner from '../../layouts/Spinner/Spinner.component'
import CommentItem from './CommentItem.component'
import CommentForm from './CommentForm.component'

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id)
  }, [getPost, match.params.id])

  if (post === null || loading) {
    return <Spinner />
  }

  const {
    _id,
    tags,
    date,
    title,
    paragraph,
    author,
    avatar,
    user,
    likes,
    comments
  } = post

  return (
    <Fragment>
      <Link to="/posts" className="btn btn-light">
        Back To Posts
      </Link>
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${user}`}>
            <img className="round-img" src={avatar} alt="avatar" />
            <h4>{author}</h4>
          </Link>
        </div>
        <div>
          <h2>{title}</h2>
          <p className="post-date">Posted on {moment(date).format('LL')}</p>
          <p className="my-1">{paragraph}</p>
          <p className="my-1">
            {tags && tags.slice().map((tag, index) => (
              <span key={index} className="badge badge-success">{tag}</span>
            ))}
          </p>
          <button type="button" className="btn btn-light">
            <i className="fas fa-thumbs-up"></i>&nbsp;
            <span>{likes.length}</span>
          </button>
        </div>
      </div>
      <CommentForm postId={_id} />
      <div className="comments">
        <h2>Comments:</h2>
        {comments && comments.map(comment => (
          <CommentItem
            key={comment._id}
            comment={comment}
            postId={_id}
          />
        ))}
      </div>
    </Fragment>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    post: state.post
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPost: id => dispatch(getPost(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)