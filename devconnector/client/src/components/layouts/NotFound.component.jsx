import React, { Fragment } from 'react'

const style = {
  marginTop: '5px'
}

const NotFound = () => {
  return (
    <Fragment>
      <h1 className="x-large text-primary">
        <i className="fas fa-exclamation-triangle"></i>&nbsp;
        Page Not Found
        <p style={style} className="large">
          Sorry, this page does not exist.
        </p>
      </h1>
    </Fragment>
  )
}

export default NotFound