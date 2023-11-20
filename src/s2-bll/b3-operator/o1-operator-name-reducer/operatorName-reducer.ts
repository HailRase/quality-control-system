import {ThunkAction} from "redux-thunk";
import {StoreType} from "../../store";
import {supervisorFavoritesRecordAPI} from "../../../s3-dal/d2-supervisor/supervisorFavoritesRecordAPI";
import {supervisorHistoryRecordAPI} from "../../../s3-dal/d2-supervisor/supervisorHistoryAPI";
import {operatorAPI} from "../../../s3-dal/d3-operator/operatorAPI";

const SET_OPERATOR_NAME_DATA = "SET_OPERATOR_NAME_DATA";
const SET_OPERATOR_NAME_STATUS = "SET_OPERATOR_NAME_STATUS"
const SET_OPERATOR_NAME_ERROR = "SET_OPERATOR_NAME_ERROR"

type DataThunkAction = ThunkAction<void,
    StoreType,
    void,
    ActionDataType>;

type ActionDataType =
    ReturnType<typeof setOperatorNameData>
    | ReturnType<typeof setOperatorNameDataStatus>
    | ReturnType<typeof setOperatorNameDataStatusError>

export type StatusType = "init" | "loading" | "loaded" | "error"

type InitialStateDataType = {
    name: string
}

type InitState = {
    data: InitialStateDataType
    status: StatusType,
    errorMessage: string,
}

const initialState: InitState = {
    data: {
        name: ''
    },
    status: 'init',
    errorMessage: ''
}

export const operatorNameReducer = (state = initialState, action: ActionDataType) => {
    switch (action.type) {
        case SET_OPERATOR_NAME_DATA: {
            return {
                ...state,
                data: action.data
            }
        }
        case SET_OPERATOR_NAME_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_OPERATOR_NAME_ERROR: {
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
export const setOperatorNameData = (data: InitialStateDataType) => {
    return {
        type: SET_OPERATOR_NAME_DATA,
        data
    } as const
};

const setOperatorNameDataStatus = (status: StatusType) => {
    return {
        type: SET_OPERATOR_NAME_STATUS,
        status
    } as const
}
export const setOperatorNameDataStatusError = (errorMessage: string) => {
    return {
        type: SET_OPERATOR_NAME_ERROR,
        errorMessage
    } as const
}

export const fetchOperatorNameData = (userId:string): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setOperatorNameDataStatus("loading"))
        const {data} = await operatorAPI.getOperatorNameData(userId)
        dispatch(setOperatorNameData(data))
        dispatch(setOperatorNameDataStatus("loaded"))
    } catch (e: any) {
        dispatch(setOperatorNameDataStatus("error"))
        dispatch(setOperatorNameDataStatusError(e.message))
    }
}



