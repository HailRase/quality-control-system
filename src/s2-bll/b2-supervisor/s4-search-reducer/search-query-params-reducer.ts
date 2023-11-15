import {ThunkAction} from "redux-thunk";
import {StoreType} from "../../store";
import {supervisorSearchRecordAPI} from "../../../s3-dal/d2-supervisor/supervisorSearchAPI";

const SET_SEARCH_QUERY_PARAMS_DATA = "SET_SEARCH_QUERY_PARAMS_DATA";
const SET_SEARCH_QUERY_PARAMS_STATUS = "SET_SEARCH_QUERY_PARAMS_STATUS"
const SET_SEARCH_QUERY_PARAMS_ERROR = "SET_SEARCH_QUERY_PARAMS_ERROR"

type DataThunkAction = ThunkAction<void,
    StoreType,
    void,
    ActionDataType>;

type ActionDataType =
    ReturnType<typeof setSearchQueryParamsData>
    | ReturnType<typeof setSearchQueryParamsDataStatus>
    | ReturnType<typeof setSearchQueryParamsDataStatusError>

export type StatusType = "init" | "loading" | "loaded" | "error"

export type InitialStateDataType = {
    startPeriod: string,
    endPeriod: string,
    phrase: string
}


type InitState = {
    data: InitialStateDataType
    status: StatusType,
    errorMessage: string,
}

const initialState: InitState = {
    data: {
        startPeriod: '',
        endPeriod: '',
        phrase: ''
    },
    status: 'init',
    errorMessage: ''
}

export const searchQueryParamsReducer = (state = initialState, action: ActionDataType) => {
    switch (action.type) {
        case SET_SEARCH_QUERY_PARAMS_DATA: {
            return {
                ...state,
                data: action.data
            }
        }
        case SET_SEARCH_QUERY_PARAMS_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_SEARCH_QUERY_PARAMS_ERROR: {
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
export const setSearchQueryParamsData = (data: InitialStateDataType) => {
    return {
        type: SET_SEARCH_QUERY_PARAMS_DATA,
        data
    } as const
};

export const setSearchQueryParamsDataStatus = (status: StatusType) => {
    return {
        type: SET_SEARCH_QUERY_PARAMS_STATUS,
        status
    } as const
}
export const setSearchQueryParamsDataStatusError = (errorMessage: string) => {
    return {
        type: SET_SEARCH_QUERY_PARAMS_ERROR,
        errorMessage
    } as const
}




