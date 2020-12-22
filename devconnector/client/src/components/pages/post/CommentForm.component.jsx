import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addComment } from '../../../actions/post'
import PropTypes from 'prop-types'

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('')

  const submit = event => {
    event.preventDefault()
    addComment(postId, { text })
    setText('')
  }

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave A Comment</h3>
      </div>
      <form className="form my-1" onSubmit={submit}>
        <textarea
          value={text}
          onChange={event => setText(event.target.value)}
          name="text"
          cols="30"
          rows="5"
          placeholder="Comment on this post"
        />
        <button className="btn btn-dark my-1" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    addComment: (id, formData) => dispatch(addComment(id, formData))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(CommentForm)