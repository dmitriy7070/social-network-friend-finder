import { FormAction, stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { API, ResultCodeEnum, ResultCodeForCaptha } from "../api/api";
import { AppStateType } from "./redux-store";

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';


let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null //if null, then captcha is not required 
};

export type InitialStateType = typeof initialState;



const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
                //  isAuth: true
            }
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

type ActionsTypes = setAuthUserDataActionType | getCaptchaUrlSuccessActionType

type setAuthUserDataActionPayloadType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type setAuthUserDataActionType = {
    type: typeof SET_USER_DATA
    payload: setAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setAuthUserDataActionType => ({ type: SET_USER_DATA, payload: { userId, email, login, isAuth } })



type getCaptchaUrlSuccessActionType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    payload: { captchaUrl: string } /*getCaptchaUrlSuccessActionPayloadType*/
}

export const getCaptchaUrlSuccess = (captchaUrl: string): getCaptchaUrlSuccessActionType => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl } })



type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes | FormAction>

export const getAuth = (): ThunkType => async (dispatch) => {
    let getUsersData = await API.getAuth()
    if (getUsersData.resultCode === ResultCodeEnum.Success) {
        let { id, email, login } = getUsersData.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
};


export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let loginData = await API.login(email, password, rememberMe, captcha);
    if (loginData.resultCode === ResultCodeEnum.Success) {
        dispatch(getAuth());
    } else {
        if (loginData.resultCode === ResultCodeForCaptha.CapthaIsRequired) {
            dispatch(getCaptchaUrl());
        }

        let message = loginData.messages.length > 0 ? loginData.messages[0] : "Some Error";
        dispatch(stopSubmit("login", { _error: message }));
    }
}



export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    let data = await API.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}



export const logout = (): ThunkType => async (dispatch) => {
    let response = await API.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}



export default authReducer; 