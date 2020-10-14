import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import SubMenu from './SubMenu'

import "./style.scss";

const Navbar = (props) => {

  return (
    <header>
        <div className="container">
          <div className="header-top">
              <Link to='/' className='brand-logo'> PoC App </Link>
              {props.user ? signedInLinks(props) : signedOutLinks()}        
          </div>
        </div>
        { props.user ? <SubMenu />: '' }
    </header>
  )
}

function signedInLinks(props) {
  return (
    <ul className="right">
      <li className="welcome"> <img width="22" height="22" src="https://www.flaticon.com/svg/static/icons/svg/145/145845.svg"/>Welcome </li>
      <li className="welcome"> Account # {props.user._id} </li>  
      <li> <NavLink onClick={ props.logout }  to='/'  > Logout </NavLink> </li>
    </ul>
  )
}

function signedOutLinks() {
  return (
    <ul className="right">
      <li> <NavLink to="/signup"> Sign Up </NavLink> </li>
      <li> <NavLink to="/login"> Login </NavLink> </li>
    </ul>
  )
}


const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => { dispatch({ type: 'LOGOUT'})}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)