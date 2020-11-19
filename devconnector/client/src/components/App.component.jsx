import React, { Fragment } from 'react'
import Navbar from './layouts/Navbar.component'
import Landing from './layouts/Landing.component'
import './App.css'

function App() {
  return (
    <Fragment>
      <Navbar />
      <Landing />
    </Fragment>
  )
}

export default App