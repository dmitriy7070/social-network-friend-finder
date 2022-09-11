import { ResultCodeEnum } from './../api/api';
import { API } from "../api/api";
import { FormAction, stopSubmit } from "redux-form";
import { PhotosType, PostType, ProfileType } from "../types/types";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "./redux-store";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = "SET-STATUS";
const SAVE_PHOTO_SUCCESS = "SAVE_PHOTO_SUCCESS"


let initialState = {
    postData: [
        { id: 1, message: 'Hi, how are you?', likesCount: 17 },
        { id: 2, message: 'My first post!', likesCount: 23 }
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
    newPostText: ''
}

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                postData: [...state.postData, newPost],
                newPostText: '',
            };
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            };

        case SET_STATUS:
            return {
                ...state,
                status: action.status
            };

        case SAVE_PHOTO_SUCCESS:
            return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType };

        default:
            return state;
    }
}

type ActionsTypes = AddPostActionCreaterActionType | SetUserProfileActionType | SetStatusActionType | SavePhotoSuccessActionType

type AddPostActionCreaterActionType = {
    type: typeof ADD_POST
    newPostText: string
}

export const addPostActionCreater = (newPostText: string): AddPostActionCreaterActionType => {
    return {
        type: ADD_POST, newPostText: newPostText
    }
}


type SetUserProfileActionType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}

export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => {
    return {
        type: SET_USER_PROFILE, profile: profile
    }
}


type SetStatusActionType = {
    type: typeof SET_STATUS
    status: string
}

export const setStatus = (status: string): SetStatusActionType => ({ type: SET_STATUS, status })


type SavePhotoSuccessActionType = {
    type: typeof SAVE_PHOTO_SUCCESS
    photos: PhotosType
}

export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({ type: SAVE_PHOTO_SUCCESS, photos })


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes | FormAction>

export const getProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await API.getProfile(userId)
    dispatch(setUserProfile(data));
};


export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await API.getStatus(userId)
    dispatch(setStatus(data));
};


export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    let response = await API.updateStatus(status);
    if (response.resultCode === ResultCodeEnum.Success) {
        dispatch(setStatus(status));
    }
}


export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await API.savePhoto(file);

    if (data.resultCode === 0) {
        dispatch(savePhotoSuccess(data.data.photos));
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const data = await API.saveProfile(profile);
    if (data.resultCode === 0 && userId != null) {
        dispatch(getProfile(userId));
    } else {
        dispatch(stopSubmit("edit-profile", { _error: data.messages[0] }));
        return Promise.reject(data.messages[0]);
    }
}


export default profileReducer;
