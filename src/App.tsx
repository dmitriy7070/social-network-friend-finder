import React from 'react';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import DialogsContainer from './components/Dialogs/DialogsСontainer';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { initializeApp } from './redux/appReducer';
import { connect } from "react-redux";
import { compose } from "redux";
import Preloader from './components/Common/Preloader/Preloader';
import { AppStateType } from './redux/redux-store';
import UseVpn from './components/Common/VPN/UseVpn';

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}


class App extends React.Component<MapPropsType & DispatchPropsType> {

  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <div>
        <UseVpn />
        <Preloader />
      </div>
    }

    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <div className='app-wrapper-content'>
          <Routes>
            <Route path="/dialogs" element={<DialogsContainer
            />} />
            <Route path="/profile/:userId" element={<ProfileContainer
            />} />
            <Route path="/profile/*" element={<ProfileContainer
            />} />
            <Route path="/users" element={<UsersContainer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/profile" />} />
          </Routes>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

export default compose<React.ComponentType>(
  connect(mapStateToProps, { initializeApp }))(App);








