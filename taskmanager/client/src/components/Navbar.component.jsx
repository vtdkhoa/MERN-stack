import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'

function NavBar() {
  const [activeItem, setActiveItem] = useState('home')

  const handleActiveItem = (event, { name }) => {
    event.preventDefault()
    setActiveItem(name)
  }

  return (
    <Menu pointing secondary>
      <Menu.Item
        name="home"
        active={activeItem === 'home'}
        onClick={handleActiveItem}
      />
      <Menu.Item
        name="dashboard"
        active={activeItem === 'dashboard'}
        onClick={handleActiveItem}
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="register"
          active={activeItem === 'register'}
          onClick={handleActiveItem}
        />
        <Menu.Item
          name="login"
          active={activeItem === 'login'}
          onClick={handleActiveItem}
        />
      </Menu.Menu>
    </Menu>
  )
}

export default NavBar