import {ThunkAction} from "redux-thunk";
import {StoreType} from "../../store";
import {administratorProfilesAPI} from "../../../s3-dal/d1-administrator/administratorProfilesAPI";
import {supervisorOperatorsListAPI} from "../../../s3-dal/d2-supervisor/supervisorOperatorsListAPI";

const SET_OPERATORS_LIST_STATISTICS_DATA = "SET_OPERATORS_LIST_STATISTICS_DATA";
const SET_OPERATORS_LIST_STATISTICS_STATUS = "SET_OPERATORS_LIST_STATISTICS_STATUS"
const SET_OPERATORS_LIST_STATISTICS_ERROR = "SET_OPERATORS_LIST_STATISTICS_ERROR"

type DataThunkAction = ThunkAction<void,
    StoreType,
    void,
    ActionDataType>;

type ActionDataType =
    ReturnType<typeof setOperatorsListStatisticsData>
    | ReturnType<typeof setOperatorsListStatisticsDataStatus>
    | ReturnType<typeof setOperatorsListStatisticsDataStatusError>

export type StatusType = "init" | "loading" | "loaded" | "error"

export type InitialStateDataType = {
    good_records: number,
    bad_records: number,
    all_records: number

}


type InitState = {
    data: InitialStateDataType
    status: StatusType,
    errorMessage: string,
}

const initialState: InitState = {
    data: {
        good_records: 0,
        bad_records: 0,
        all_records: 0
    },
    status: 'init',
    errorMessage: ''
}

export const operatorsListStatisticsReducer = (state = initialState, action: ActionDataType) => {
    switch (action.type) {
        case SET_OPERATORS_LIST_STATISTICS_DATA: {
            return {
                ...state,
                data: action.data
            }
        }
        case SET_OPERATORS_LIST_STATISTICS_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_OPERATORS_LIST_STATISTICS_ERROR: {
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
export const setOperatorsListStatisticsData = (data: InitialStateDataType) => {
    return {
        type: SET_OPERATORS_LIST_STATISTICS_DATA,
        data
    } as const
};

const setOperatorsListStatisticsDataStatus = (status: StatusType) => {
    return {
        type: SET_OPERATORS_LIST_STATISTICS_STATUS,
        status
    } as const
}
export const setOperatorsListStatisticsDataStatusError = (errorMessage: string) => {
    return {
        type: SET_OPERATORS_LIST_STATISTICS_ERROR,
        errorMessage
    } as const
}

export const fetchOperatorsListStatisticsData = (startData: string, endData: string): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setOperatorsListStatisticsDataStatus("loading"))
        const {data} = await supervisorOperatorsListAPI.getSupervisorOperatorsListStatisticsData(startData, endData)
        dispatch(setOperatorsListStatisticsData(data))
        dispatch(setOperatorsListStatisticsDataStatus("loaded"))
    } catch (e: any) {
        dispatch(setOperatorsListStatisticsDataStatus("error"))
        dispatch(setOperatorsListStatisticsDataStatusError(e.message))
    }
}
