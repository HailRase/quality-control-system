import {ThunkAction} from "redux-thunk";
import {StoreType} from "../../store";
import {operatorAPI} from "../../../s3-dal/d3-operator/operatorAPI";
import {supervisorOperatorsListAPI} from "../../../s3-dal/d2-supervisor/supervisorOperatorsListAPI";

const SET_BONUS_DATA = "SET_BONUS_DATA";
const SET_BONUS_STATUS = "SET_BONUS_STATUS"
const SET_BONUS_ERROR = "SET_BONUS_ERROR"

type DataThunkAction = ThunkAction<void,
    StoreType,
    void,
    ActionDataType>;

type ActionDataType =
    ReturnType<typeof setBonusData>
    | ReturnType<typeof setBonusDataStatus>
    | ReturnType<typeof setBonusDataStatusError>

export type StatusType = "init" | "loading" | "loaded" | "error"

type InitialStateDataType = {
    bonus: number
}

type InitState = {
    data: InitialStateDataType
    status: StatusType,
    errorMessage: string,
}

const initialState: InitState = {
    data: {
        bonus: 0
    },
    status: 'init',
    errorMessage: ''
}

export const bonusReducer = (state = initialState, action: ActionDataType) => {
    switch (action.type) {
        case SET_BONUS_DATA: {
            return {
                ...state,
                data: action.data
            }
        }
        case SET_BONUS_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_BONUS_ERROR: {
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
export const setBonusData = (data: InitialStateDataType) => {
    return {
        type: SET_BONUS_DATA,
        data
    } as const
};

const setBonusDataStatus = (status: StatusType) => {
    return {
        type: SET_BONUS_STATUS,
        status
    } as const
}
export const setBonusDataStatusError = (errorMessage: string) => {
    return {
        type: SET_BONUS_ERROR,
        errorMessage
    } as const
}

export const fetchBonusData = (eval_recs: number, arrIdRec: number[]): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setBonusDataStatus("loading"))
        const {data} = await supervisorOperatorsListAPI.getBonusData(eval_recs, arrIdRec)
        dispatch(setBonusData({
            bonus: data
        }))
        dispatch(setBonusDataStatus("loaded"))
    } catch (e: any) {
        dispatch(setBonusDataStatus("error"))
        dispatch(setBonusDataStatusError(e.message))
    }
}



