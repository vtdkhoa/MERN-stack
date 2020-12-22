import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { getMyPosts } from '../../../actions/post'
import PropTypes from 'prop-types'
import PostItem from './PostItem.component'
import Spinner from '../../layouts/Spinner/Spinner.component'

const MyPosts = ({ getMyPosts, post: { myPosts, loading } }) => {
  useEffect(() => {
    getMyPosts()
  }, [getMyPosts])

  if (loading) {
    return <Spinner />
  }

  return (
    <Fragment>
      <h1 className="large text-primary">My Posts</h1>
      <div className="posts">
        {
          myPosts.length > 0
            ? myPosts.map(post => (
              <PostItem
                key={post._id}
                post={post}
                showButton={true}
              />
            ))
          : <h4>You have no post.</h4>
        }
      </div>
    </Fragment>
  )
}

MyPosts.propTypes = {
  post: PropTypes.object.isRequired,
  getMyPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    post: state.post
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMyPosts: () => dispatch(getMyPosts())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPosts)