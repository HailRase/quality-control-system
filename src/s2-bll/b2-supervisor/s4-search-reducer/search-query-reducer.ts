import {ThunkAction} from "redux-thunk";
import {StoreType} from "../../store";
import {administratorProfilesAPI} from "../../../s3-dal/d1-administrator/administratorProfilesAPI";
import {supervisorSearchRecordAPI} from "../../../s3-dal/d2-supervisor/supervisorSearchAPI";

const SET_SEARCH_QUERY_DATA = "SET_SEARCH_QUERY_DATA";
const SET_SEARCH_QUERY_STATUS = "SET_SEARCH_QUERY_STATUS"
const SET_SEARCH_QUERY_ERROR = "SET_SEARCH_QUERY_ERROR"

type DataThunkAction = ThunkAction<void,
    StoreType,
    void,
    ActionDataType>;

type ActionDataType =
    ReturnType<typeof setSearchQueryData>
    | ReturnType<typeof setSearchQueryDataStatus>
    | ReturnType<typeof setSearchQueryDataStatusError>

export type StatusType = "init" | "loading" | "loaded" | "error"
type InitialStateItemType = {
    id: string
    title: string
    text:string
    post_marks: string
    common_mark: number
    sum_marks: number
    is_cancelled: boolean
}
export type InitialStateDataType = {
    items: InitialStateItemType[]
    total: number
    page: number
    size: number
    pages: number

}


type InitState = {
    data: InitialStateDataType
    status: StatusType,
    errorMessage: string,
}

const initialState: InitState = {
    data: {
        items: [
            {
                id: '',
                title: '',
                text: '',
                post_marks: '',
                common_mark: 0,
                sum_marks: 0,
                is_cancelled: false
            }
        ],
        total: 0,
        page: 1,
        size: 10,
        pages: 0,
    },
    status: 'init',
    errorMessage: ''
}

export const searchQueryReducer = (state = initialState, action: ActionDataType) => {
    switch (action.type) {
        case SET_SEARCH_QUERY_DATA: {
            return {
                ...state,
                data: action.data
            }
        }
        case SET_SEARCH_QUERY_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_SEARCH_QUERY_ERROR: {
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
export const setSearchQueryData = (data: InitialStateDataType) => {
    return {
        type: SET_SEARCH_QUERY_DATA,
        data
    } as const
};

const setSearchQueryDataStatus = (status: StatusType) => {
    return {
        type: SET_SEARCH_QUERY_STATUS,
        status
    } as const
}
export const setSearchQueryDataStatusError = (errorMessage: string) => {
    return {
        type: SET_SEARCH_QUERY_ERROR,
        errorMessage
    } as const
}

export const fetchSearchUserData = (userID: string, phrase: string, startPeriod: string, endPeriod: string, page: number, size: number, query?:string): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setSearchQueryDataStatus("loading"))
        const {data} = await supervisorSearchRecordAPI.getSearchUserData(userID,phrase, startPeriod, endPeriod, page, size, query)
        dispatch(setSearchQueryData(data))
        dispatch(setSearchQueryDataStatus("loaded"))
    } catch (e: any) {
        dispatch(setSearchQueryDataStatus("error"))
        dispatch(setSearchQueryDataStatusError(e.message))
    }
}
