import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { addLike, deletePost } from '../../../actions/post'
import { Link } from 'react-router-dom'
import moment from 'moment'
import PropTypes from 'prop-types'
import Modal from '../../layouts/Modal/Modal.component'

const PostItem = ({ post, addLike, showButton, deletePost }) => {
  const [show, setShow] = useState(false)
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

  const handleDeletePost = id => {
    deletePost(id)
    setShow(false)
  }

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
        <p className="post-date">Posted on {moment(date).format('LL')}</p>
        <p className="my-1">Tags:&nbsp;
          {tags && tags.slice().map((tag, index) => (
            <span key={index} className="badge badge-success">{tag}</span>
          ))}
        </p>
        <button type="button" className="btn btn-light" onClick={() => addLike(_id)}>
          <i className="fas fa-thumbs-up"></i>&nbsp;
          <span>{likes.length}</span>
        </button>
        <Link to={`/post/${_id}`} className="btn btn-primary">
          Discussion <span className='comment-count'>{comments.length}</span>
        </Link>
        {showButton && (
          <Fragment>
            <Modal
              show={show}
              handleClose={() => setShow(false)}
              handleDelete={() => handleDeletePost(_id)}
            >
              <h4>Are you sure you want to delete this post ?</h4>
            </Modal>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => setShow(true)}
            >
              <i className="fas fa-minus-circle"></i> Delete
            </button>
          </Fragment>
        )}
      </div>
    </div>
  )
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    addLike: id => dispatch(addLike(id)),
    deletePost: id => dispatch(deletePost(id))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(PostItem)