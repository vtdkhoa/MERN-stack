import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { getPosts } from '../../../actions/post'
import PropTypes from 'prop-types'
import PostForm from './PostForm.component'
import PostItem from './PostItem.component'

const Posts = ({ getPosts, post: { posts } }) => {
  useEffect(() => {
    getPosts()
  }, [getPosts])

  return (
    <Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome to the community !
      </p>
      <PostForm />
      <div className="posts">
        {
          posts.length > 0
            ? posts.map(post => (
              <PostItem key={post._id} post={post} />
            ))
            : <h4>No Post Found.</h4>
        }
      </div>
    </Fragment>
  )
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    post: state.post
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getPosts: () => dispatch(getPosts())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Posts)