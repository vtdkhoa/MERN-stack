import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { getGitHubRepos } from '../../../../actions/profile'
import PropTypes from 'prop-types'

const GitHub = ({ username, profile: { repos }, getRepos }) => {
  useEffect(() => {
    getRepos(username)
  }, [getRepos, username])

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">
        <i className="fab fa-github" /> GitHub Repos
      </h2>
      {
        repos.length > 0
          ? repos.map(repo => (
            <div key={repo.id} className="repo bg-white p-1 my-1">
              <div>
                <h4>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    {repo.name}
                  </a>
                </h4>
                <p>{repo.description}</p>
              </div>
              <div>
                <ul>
                  <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
                  <li className="badge badge-dark">Watchers: {repo.watchers_count}</li>
                  <li className="badge badge-light">Forks: {repo.forks}</li>
                </ul>
              </div>
            </div>
          ))
          : <h4>No Repos Found.</h4>
      }
    </div>
  )
}

GitHub.propTypes = {
  username: PropTypes.string.isRequired,
  profile: PropTypes.object.isRequired,
  getRepos: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    profile: state.profile
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getRepos: username => dispatch(getGitHubRepos(username))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GitHub)