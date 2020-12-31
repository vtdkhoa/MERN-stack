import React, { Fragment } from 'react'
import { Container } from 'semantic-ui-react'
import Navbar from './Navbar.component'
import 'semantic-ui-css/semantic.min.css'

function App() {
  return (
    <Fragment>
      <Container>
        <Navbar />
      </Container>
    </Fragment>
  )
}

export default App