import React, { useState } from 'react'
import { connect } from 'react-redux'
import { removeComment } from '../../../actions/post'
import moment from 'moment'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Modal from '../../layouts/Modal/Modal.component'

const CommentItem = ({ auth, comment, postId, removeComment }) => {
  const [show, setShow] = useState(false)
  const {
    _id,
    date,
    text,
    avatar,
    user,
    name
  } = comment

  const handleRemoveComment = (postId, commentId) => {
    removeComment(postId, commentId)
    setShow(false)
  }

  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${user}`}>
          <img className="round-img" src={avatar} alt="avatar" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <Modal
          show={show}
          handleClose={() => setShow(false)}
          handleDelete={() => handleRemoveComment(postId, _id)}
        >
          <h4>Are you sure you want to remove your comment ?</h4>
        </Modal>
        <p className="my-1">{text}</p>
        <p className="post-date">{moment(date).format('LL')}</p>
        {!auth.loading && user === auth.user._id && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => setShow(true)}
          >
            <i className="fas fa-times" /> Remove
          </button>
        )}
      </div>
    </div>
  )
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  removeComment: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    removeComment: (postId, commentId) => dispatch(
      removeComment(postId, commentId)
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentItem)