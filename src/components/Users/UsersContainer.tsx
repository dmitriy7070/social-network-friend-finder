import Users from "./Users";
import { connect } from 'react-redux';
import {
    follow, unfollow,
    setCurrentPage,
    toggleFollowingProgress, getUsers
} from "../../redux/usersReducer";
import React from 'react';
import Preloader from "../Common/Preloader/Preloader";
import { compose } from "redux";
import { getPageSize, requestUsers, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress } from "../../redux/usersSelectors";
import { UserType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";

type OwnPropsType = {

}

type MapDispatchPropsType = {
    unfollow: (userId: number) => void
    follow: (userId: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
    setCurrentPage: any
    toggleFollowingProgress: any
}

type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    followingInProgress: Array<number>
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                followingInProgress={this.props.followingInProgress} />
        </>

    }
}


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: requestUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}


export default compose<React.ComponentType>(
    //withAuthNavigate,
    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, { follow, unfollow, setCurrentPage, toggleFollowingProgress, getUsers })
)(UsersContainer)
