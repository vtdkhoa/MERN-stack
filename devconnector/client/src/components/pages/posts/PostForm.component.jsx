import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createPost } from '../../../actions/post'
import PropTypes from 'prop-types'

const PostForm = ({ createPost }) => {
  const [formData, setFormData] = useState({
    title: '',
    paragraph: '',
    tags: ''
  })

  const onChange = event => setFormData({
    ...formData,
    [event.target.name]: event.target.value
  })

  const { title, paragraph, tags } = formData

  const submit = event => {
    event.preventDefault()
    createPost({ title, paragraph, tags })
    setFormData({
      title: '',
      paragraph: '',
      tags: ''
    })
  }

  return (
    <div className="post-form" onSubmit={submit}>
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form className="form my-1">
        <div className="form-group">
          <input
            type="text"
            name="title"
            placeholder="Post Title"
            value={title}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <textarea
            cols="30"
            rows="5"
            placeholder="Create a post"
            value={paragraph}
            name="paragraph"
            onChange={onChange}
          ></textarea>
        </div>
        <div className="form-group">
          <input
            type="text"
            name="tags"
            placeholder="Tags"
            value={tags}
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-dark my-1">
          Submit
        </button>
      </form>
    </div>
  )
}

PostForm.propTypes = {
  createPost: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => {
  return {
    createPost: formData => dispatch(createPost(formData))
  }
}

export default connect(
  null,
  mapDispatchToProps
)(PostForm)