import React from 'react'
import { Contain } from './index.style'
import { NavLink } from 'react-router-dom'

export interface AsideMenuProps {}

export const AsideMenu: React.FC<AsideMenuProps> = ({}) => {
  return (
    <Contain>
      <NavLink
        className={(props) =>
          `aside-link ${props.isActive ? 'aside-link-active' : ''}`
        }
        to="/"
      >
        Account
      </NavLink>
      <NavLink
        className={(props) =>
          `aside-link ${props.isActive ? 'aside-link-active' : ''}`
        }
        to="/products"
      >
        Products
      </NavLink>
      <NavLink
        className={(props) =>
          `aside-link ${props.isActive ? 'aside-link-active' : ''}`
        }
        to="/about"
      >
        About
      </NavLink>
      <a href="https://saber2pr.top/todolist-pro/" className="aside-link">
        User Document
      </a>
    </Contain>
  )
}
