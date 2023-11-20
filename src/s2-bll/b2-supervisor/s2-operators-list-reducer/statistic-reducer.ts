import {ThunkAction} from "redux-thunk";
import {StoreType} from "../../store";
import XLSX, {read, writeFile} from 'xlsx';
import {supervisorOperatorsListAPI} from "../../../s3-dal/d2-supervisor/supervisorOperatorsListAPI";
import {AxiosHeaderValue} from "axios";
import {saveAs} from "file-saver";

const SET_STATISTIC_DATA = "SET_STATISTIC_DATA";
const SET_STATISTIC_STATUS = "SET_STATISTIC_STATUS"
const SET_STATISTIC_ERROR = "SET_STATISTIC_ERROR"

type DataThunkAction = ThunkAction<void,
    StoreType,
    void,
    ActionDataType>;

type ActionDataType =
    ReturnType<typeof setStatisticData>
    | ReturnType<typeof setStatisticDataStatus>
    | ReturnType<typeof setStatisticDataStatusError>

export type StatusType = "init" | "loading" | "loaded" | "error"




type InitialStateDataType = {
    statistic: string
    contentType: string
}
type InitState = {
    data: InitialStateDataType
    status: StatusType,
    errorMessage: string,
}

const initialState: InitState = {
    data: {
        statistic: '',
        contentType: ''
    },
    status: 'init',
    errorMessage: ''
}

export const statisticReducer = (state = initialState, action: ActionDataType) => {
    switch (action.type) {
        case SET_STATISTIC_DATA: {
            return {
                ...state,
                data: action.data
            }
        }
        case SET_STATISTIC_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_STATISTIC_ERROR: {
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
export const setStatisticData = (data: InitialStateDataType) => {
    return {
        type: SET_STATISTIC_DATA,
        data
    } as const
};

const setStatisticDataStatus = (status: StatusType) => {
    return {
        type: SET_STATISTIC_STATUS,
        status
    } as const
}
export const setStatisticDataStatusError = (errorMessage: string) => {
    return {
        type: SET_STATISTIC_ERROR,
        errorMessage
    } as const
}

export const loadExcelFile = (startDate: string, endDate: string, statObj: {good_records: number,bad_records: number,all_records: number,}): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setStatisticDataStatus("loading"))
        const response = await supervisorOperatorsListAPI.loadExcelStatistic(startDate, endDate, statObj)
        console.log(response)
        /*dispatch(setStatisticData({
            statistic: response.data,
            contentType: response.headers && response.headers["Content-Type"] ? response.headers["Content-Type"].toString() : ""
        }))*/
        const blob = new Blob([response.data], { type: 'application/octet-stream' });
        saveAs(blob, 'ОтчётПоОпертаорам.xlsx');

        dispatch(setStatisticDataStatus("loaded"))
    } catch (e: any) {
        dispatch(setStatisticDataStatus("error"))
        dispatch(setStatisticDataStatusError(e.message))
    }
}
