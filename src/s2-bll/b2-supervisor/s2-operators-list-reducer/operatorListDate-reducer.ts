import {ThunkAction} from "redux-thunk";
import {StoreType} from "../../store";
import {administratorSupervisorAPI} from "../../../s3-dal/d1-administrator/administratorSupervisorAPI";
import {AxiosError} from "axios";
import {supervisorOperatorsListAPI} from "../../../s3-dal/d2-supervisor/supervisorOperatorsListAPI";

const SET_OPERATORS_LIST_DATE_DATA = "SET_OPERATORS_LIST_DATE_DATA";
const SET_OPERATORS_LIST_DATE_STATUS = "SET_OPERATORS_LIST_DATE_STATUS"
const SET_OPERATORS_LIST_DATE_ERROR = "SET_OPERATORS_LIST_DATE_ERROR"

type DataThunkAction = ThunkAction<void,
    StoreType,
    void,
    ActionDataType>;

type ActionDataType =
    ReturnType<typeof setOperatorsListDateData>
    | ReturnType<typeof setOperatorsListDateDataStatus>
    | ReturnType<typeof setOperatorsListDateDataStatusError>

export type StatusType = "init" | "loading" | "loaded" | "error"

export type InitialStateDataType = {
    startPeriod: string
    endPeriod: string
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
    },
    status: 'init',
    errorMessage: ''
}

export const operatorsListDateReducer = (state = initialState, action: ActionDataType) => {
    switch (action.type) {
        case SET_OPERATORS_LIST_DATE_DATA: {
            return {
                ...state,
                data: action.data
            }
        }
        case SET_OPERATORS_LIST_DATE_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_OPERATORS_LIST_DATE_ERROR: {
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
export const setOperatorsListDateData = (data: InitialStateDataType) => {
    return {
        type: SET_OPERATORS_LIST_DATE_DATA,
        data
    } as const
};

const setOperatorsListDateDataStatus = (status: StatusType) => {
    return {
        type: SET_OPERATORS_LIST_DATE_STATUS,
        status
    } as const
}
export const setOperatorsListDateDataStatusError = (errorMessage: string) => {
    return {
        type: SET_OPERATORS_LIST_DATE_ERROR,
        errorMessage
    } as const
}






