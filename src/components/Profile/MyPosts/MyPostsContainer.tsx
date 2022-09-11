import React from "react";
import { addPostActionCreater } from "../../../redux/profileReducer";
import MyPosts from "./MyPosts";
import {connect} from 'react-redux';
import { AppStateType } from "../../../redux/redux-store";


let mapStateToProps = (state: AppStateType) => {
  return {
    postData: state.profilePage.postData,
    newPostText: state.profilePage.newPostText
  }
}

let mapDispatchToProps = (dispatch: any) => {
  return {
    addPost: (newPostText: any) => {
      dispatch(addPostActionCreater(newPostText));
    }
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps) (MyPosts);

export default MyPostsContainer;