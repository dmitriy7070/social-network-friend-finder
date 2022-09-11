import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { AppStateType } from "../redux/redux-store";

let mapStateToPropsForNavigate = (state: AppStateType) => ({
  isAuth: state.auth.isAuth
} as MapPropsType);

type MapPropsType = {
  isAuth: boolean
}

type DispatchPropsType = {
}

export function withAuthNavigate<WCP>(WrappedComponent: React.ComponentType<WCP>) {
  const NavigateComponent: React.FC<MapPropsType> = (props) => {
    let { isAuth, ...restProps } = props

    if (!isAuth) return <Navigate to="/login/" />
    // @ts-ignore
    return <WrappedComponent {...restProps as WCP} />
  }

  let ConnectedAuthNavigateComponent = connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(mapStateToPropsForNavigate, {})(NavigateComponent);

  return ConnectedAuthNavigateComponent;
}


