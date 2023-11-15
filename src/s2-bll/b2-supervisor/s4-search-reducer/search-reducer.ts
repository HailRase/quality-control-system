import {ThunkAction} from "redux-thunk";
import {StoreType} from "../../store";
import {supervisorFavoritesRecordAPI} from "../../../s3-dal/d2-supervisor/supervisorFavoritesRecordAPI";
import {supervisorSearchRecordAPI} from "../../../s3-dal/d2-supervisor/supervisorSearchAPI";

const SET_SEARCH_DATA = "SET_SEARCH_DATA";
const SET_SEARCH_STATUS = "SET_SEARCH_STATUS"
const SET_SEARCH_ERROR = "SET_SEARCH_ERROR"

type DataThunkAction = ThunkAction<void,
    StoreType,
    void,
    ActionDataType>;

type ActionDataType =
    ReturnType<typeof setSearchData>
    | ReturnType<typeof setSearchDataStatus>
    | ReturnType<typeof setSearchDataStatusError>

export type StatusType = "init" | "loading" | "loaded" | "error"
export type UserType = {
    id: string,
    name: string,
    period_records: number
}
type InitialStateDataType = {
    period_records: number,
    users: UserType[]
}

type InitState = {
    data: InitialStateDataType
    status: StatusType,
    errorMessage: string,
}

const initialState: InitState = {
    data: {
        period_records: 0,
        users: []
    },
    status: 'init',
    errorMessage: ''
}

export const searchReducer = (state = initialState, action: ActionDataType) => {
    switch (action.type) {
        case SET_SEARCH_DATA: {
            return {
                ...state,
                data: action.data
            }
        }
        case SET_SEARCH_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_SEARCH_ERROR: {
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
export const setSearchData = (data: InitialStateDataType) => {
    return {
        type: SET_SEARCH_DATA,
        data
    } as const
};

const setSearchDataStatus = (status: StatusType) => {
    return {
        type: SET_SEARCH_STATUS,
        status
    } as const
}
export const setSearchDataStatusError = (errorMessage: string) => {
    return {
        type: SET_SEARCH_ERROR,
        errorMessage
    } as const
}

export const fetchSearchData = (startPeriod: string, endPeriod: string, phrase: string): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setSearchDataStatus("loading"))
        const {data} = await supervisorSearchRecordAPI.getSearchData(startPeriod, endPeriod, phrase)
        dispatch(setSearchData(data))
        dispatch(setSearchDataStatus("loaded"))
    } catch (e: any) {
        dispatch(setSearchDataStatus("error"))
        dispatch(setSearchDataStatusError(e.message))
    }
}



