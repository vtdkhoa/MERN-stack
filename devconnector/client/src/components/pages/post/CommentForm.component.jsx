import React from 'react'

const CommentForm = () => {
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave A Comment</h3>
      </div>
      <form className="form my-1">
        <textarea
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

export default CommentForm