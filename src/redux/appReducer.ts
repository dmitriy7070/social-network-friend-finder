import { getAuth } from "./authReducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';


let initialState = {
    initialized: false,
};


export type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: initializedSuccessActionType): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}

type initializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): initializedSuccessActionType => ({ type: INITIALIZED_SUCCESS })

export const initializeApp = () => {
    return (dispatch: any) => {
        let promise = dispatch(getAuth());
        Promise.all([promise])
            .then(() => {
                dispatch(initializedSuccess());
            });
    }
}


export default appReducer; 