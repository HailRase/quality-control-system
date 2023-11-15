import {ThunkAction} from "redux-thunk";
import {StoreType} from "../../store";
import {supervisorFavoritesRecordAPI} from "../../../s3-dal/d2-supervisor/supervisorFavoritesRecordAPI";
import {supervisorHistoryRecordAPI} from "../../../s3-dal/d2-supervisor/supervisorHistoryAPI";

const SET_HISTORY_DATA = "SET_HISTORY_DATA";
const SET_HISTORY_STATUS = "SET_HISTORY_STATUS"
const SET_HISTORY_ERROR = "SET_HISTORY_ERROR"

type DataThunkAction = ThunkAction<void,
    StoreType,
    void,
    ActionDataType>;

type ActionDataType =
    ReturnType<typeof setHistoryData>
    | ReturnType<typeof setHistoryDataStatus>
    | ReturnType<typeof setHistoryDataStatusError>

export type StatusType = "init" | "loading" | "loaded" | "error"
type DateHistoryItemType = {
    date: string,
    user: string,
    action: string
}
type InitialStateDataType = {
    [date: string] : DateHistoryItemType []
}

type InitState = {
    data: InitialStateDataType
    status: StatusType,
    errorMessage: string,
}

const initialState: InitState = {
    data: {
        "2023-10-27": [
            {
                date: "2023-10-27 13:59:13.536024",
                user: "test",
                action: "Update manual evaluation 'Active conversation' - mark 3"
            },
            {
                date: "2023-10-27 14:13:09.234543",
                user: "test",
                action: "Update auto evaluation 'Повышение тона' from 0 -> 1"
            },

        ],
        "2023-11-27": [
            {
                date: "2023-10-27 13:59:13.536024",
                user: "test",
                action: "Update manual evaluation 'Active conversation' - mark 3"
            },
            {
                date: "2023-10-27 14:13:09.234543",
                user: "test",
                action: "Update auto evaluation 'Повышение тона' from 0 -> 1"
            },

        ],
    },
    status: 'init',
    errorMessage: ''
}

export const historyReducer = (state = initialState, action: ActionDataType) => {
    switch (action.type) {
        case SET_HISTORY_DATA: {
            return {
                ...state,
                data: action.data
            }
        }
        case SET_HISTORY_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_HISTORY_ERROR: {
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
export const setHistoryData = (data: InitialStateDataType) => {
    return {
        type: SET_HISTORY_DATA,
        data
    } as const
};

const setHistoryDataStatus = (status: StatusType) => {
    return {
        type: SET_HISTORY_STATUS,
        status
    } as const
}
export const setHistoryDataStatusError = (errorMessage: string) => {
    return {
        type: SET_HISTORY_ERROR,
        errorMessage
    } as const
}

export const fetchHistoryData = (recordID:number): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setHistoryDataStatus("loading"))
        const {data} = await supervisorHistoryRecordAPI.getChangesRecordHistory(recordID)
        dispatch(setHistoryData(data))
        dispatch(setHistoryDataStatus("loaded"))
    } catch (e: any) {
        dispatch(setHistoryDataStatus("error"))
        dispatch(setHistoryDataStatusError(e.message))
    }
}



