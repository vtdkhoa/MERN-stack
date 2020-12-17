import React, { useState } from 'react'

const PostForm = () => {
  const [formData, setFormData] = useState({ title: '', paragraph: '' })

  const onChange = event => setFormData({
    ...formData,
    [event.target.name]: event.target.value
  })

  const { title, paragraph } = formData

  return (
    <div className="post-form">
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
        <button type="submit" className="btn btn-dark my-1">
          Submit
        </button>
      </form>
    </div>
  )
}

export default PostForm