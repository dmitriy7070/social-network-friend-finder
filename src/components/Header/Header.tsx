import React from "react";
import classes from './Header.module.css';
import { NavLink } from 'react-router-dom';
import logo from "./../../resourses/images/logo.png"


type PropsType = {
    isAuth: boolean
    logout: any
    login: any
}

const Header: React.FC<PropsType> = (props) => {
  return <header className={classes.header}>
    <div className={classes.loginBlock}>
      {props.isAuth
        ? <div> {props.login}  <button className={classes.loginBlockOut} onClick={props.logout}>Log Out</button></div>
        : <NavLink to={'/login'}>Login</NavLink>
      }
    </div>
    <div className={classes.container}>
      <div><img className={classes.logo} src={logo} /></div>
      <div className={classes.con1}>
        <NavLink to="/profile">Profile</NavLink>
      </div>

      <div className={classes.con2}>
        <NavLink to="/dialogs">Messages</NavLink>
      </div>

      <div className={classes.con3}>
        <NavLink to="/users">Find users</NavLink>
      </div>
    </div>
  </header>
}

export default Header;