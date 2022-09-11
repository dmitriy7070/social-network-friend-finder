import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import { getProfile, getStatus, updateStatus, savePhoto, saveProfile } from "../../redux/profileReducer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { withAuthNavigate } from "../../hoc/withAuthNavigate";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";

type MapPropsType = ReturnType <typeof mapStateToProps>
type DispatchPropsType = {
  getProfile: (userId: any) => void
  getStatus: (userId: any) => void
  updateStatus: () => void
  savePhoto: () => void
  saveProfile: () => void
}

type PathParamsType = {
  userId: string
  router: any
  profile: any
}

type PropsTy = {
  props: any
}

type Props = MapPropsType & DispatchPropsType & PathParamsType

class ProfileContainer extends React.Component<Props> {

  refreshProfile() {
    let userId = this.props.router.params.userId;
    if (!userId) {
      userId = this.props.authorizedUserId;
    }
    this.props.getProfile(userId);
    this.props.getStatus(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.router.params.userId != prevProps.router.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile {...this.props}
        isOwner={!this.props.router.params.userId}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        savePhoto={this.props.savePhoto} />
    )
  }
}

let mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth
});

function withRouter(Component: any) {
  function ComponentWithRouterProp(props: any) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

export default compose<React.ComponentType>(
  connect(mapStateToProps, { getProfile, getStatus, updateStatus, savePhoto, saveProfile }),
  withRouter,
  withAuthNavigate
)(ProfileContainer);
