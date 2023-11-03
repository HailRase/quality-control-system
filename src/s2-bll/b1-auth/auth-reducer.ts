import {ThunkAction} from "redux-thunk";
import {authAPI} from "../../s3-dal/a0-auth/auth";
import {StoreType} from "../store";

const SET_AUTH_DATA = "SET_AUTH_DATA";
const SET_IS_AUTH_DATA = "SET_IS_AUTH_DATA";
const SET_AUTH_STATUS = "SET_AUTH_STATUS"
const SET_AUTH_ERROR = "SET_AUTH_ERROR"

type DataThunkAction = ThunkAction<void,
    StoreType,
    void,
    ActionDataType>;

type ActionDataType =
    ReturnType<typeof setAuthData>
    | ReturnType<typeof setIsAuthData>
    | ReturnType<typeof setAuthDataStatus>
    | ReturnType<typeof setAuthDataStatusError>

export type StatusType = "init" | "loading" | "loaded" | "error"

export type InitialStateDataType = {
    access_token: string | null
    token_type: string | null
    role: string | null

}


type InitState = {
    data: InitialStateDataType
    isAuth: boolean
    status: StatusType,
    errorMessage: string,
}

const initialState: InitState = {
    data: {
        access_token: "",
        token_type: "",
        role: null
    },
    isAuth: false,
    status: 'init',
    errorMessage: ''
}

export const authReducer = (state = initialState, action: ActionDataType) => {
    switch (action.type) {
        case SET_AUTH_DATA: {
            return {
                ...state,
                data: action.data
            }
        }
        case SET_IS_AUTH_DATA: {
            return {
                ...state,
                isAuth: action.isAuth
            }
        }
        case SET_AUTH_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_AUTH_ERROR: {
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        }
        default: {
            return state
        }
    }
}
export const setAuthData = (data: InitialStateDataType) => {
    return {
        type: SET_AUTH_DATA,
        data
    } as const
};
export const setIsAuthData = (isAuth: boolean) => {
    return {
        type: SET_IS_AUTH_DATA,
        isAuth
    } as const
};

const setAuthDataStatus = (status: StatusType) => {
    return {
        type: SET_AUTH_STATUS,
        status
    } as const
}
export const setAuthDataStatusError = (errorMessage: string) => {
    return {
        type: SET_AUTH_ERROR,
        errorMessage
    } as const
}

export const login = (username: string, password: string): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setAuthDataStatus("loading"))
        debugger
        const {data, status} = await authAPI.login(username, password)
        status === 200
            ? dispatch(setIsAuthData(true))
            : dispatch(setIsAuthData(false))
        localStorage.setItem('token', data.access_token)
        localStorage.setItem('token_type', data.token_type)
        localStorage.setItem('role', data.role)
        dispatch(setAuthData(data))
        dispatch(setAuthDataStatus("loaded"))
    } catch (e: any) {
        if (e.response.status === 404) {
            dispatch(setAuthDataStatus("error"))
            dispatch(setAuthDataStatusError("Неверный логин или пароль"))
        } else {
            dispatch(setAuthDataStatus("error"))
            dispatch(setAuthDataStatusError(e.response))
        }
    }
}
export const logout = (): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setAuthDataStatus("loading"))
        localStorage.removeItem('token')
        localStorage.removeItem('token_type')
        localStorage.removeItem('role')
        dispatch(setIsAuthData(false))
        dispatch(setAuthData({role: null, token_type: '', access_token: ''}))
        dispatch(setAuthDataStatus("loaded"))
    } catch (e: any) {
        dispatch(setAuthDataStatus("error"))
        dispatch(setAuthDataStatusError(e.message))
    }
}
export const getAuthData = (): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setAuthDataStatus("loading"))
        const {data, status} = await authAPI.me()
        if (status === 200) {
            dispatch(setAuthData({
                access_token: localStorage.getItem('token'),
                token_type: localStorage.getItem('token_type'),
                role: data.role
            }))
            dispatch(setIsAuthData(true))
        } else {
            dispatch(setAuthData({
                access_token: null,
                token_type: null,
                role: null
            }))
            dispatch(setIsAuthData(false))
            dispatch(setAuthDataStatusError('Неверный логин или пароль'))
        }

        dispatch(setAuthDataStatus("loaded"))
    } catch (e: any) {
        if (e.response.status === 401) {
            dispatch(setAuthDataStatus("error"))
            dispatch(setAuthDataStatusError("Не авторизован"))
        } else {
            dispatch(setAuthDataStatus("error"))
            dispatch(setAuthDataStatusError(e.response))
        }
    }
}


