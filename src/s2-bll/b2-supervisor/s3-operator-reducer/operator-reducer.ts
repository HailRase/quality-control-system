import {ThunkAction} from "redux-thunk";
import {StoreType} from "../../store";
import {administratorProfilesAPI} from "../../../s3-dal/d1-administrator/administratorProfilesAPI";
import {supervisorOperatorsListAPI} from "../../../s3-dal/d2-supervisor/supervisorOperatorsListAPI";

const SET_OPERATOR_DATA = "SET_OPERATOR_DATA";
const SET_OPERATOR_STATUS = "SET_OPERATOR_STATUS"
const SET_OPERATOR_ERROR = "SET_OPERATOR_ERROR"

type DataThunkAction = ThunkAction<void,
    StoreType,
    void,
    ActionDataType>;

type ActionDataType =
    ReturnType<typeof setOperatorData>
    | ReturnType<typeof setOperatorDataStatus>
    | ReturnType<typeof setOperatorDataStatusError>

export type StatusType = "init" | "loading" | "loaded" | "error"
type GoodBadRecordType = {
    id: number,
    title: string,
    time_created: string,
    post_marks: string,
    sum_marks: number,
    is_cancelled: boolean | null
}
type InitialStateDataType = {
    good_per_settings: number,
    amount_good: number,
    bad_per_settings: number,
    amount_bad: number,
    canceled_good: number,
    canceled_bad: number,
    all_good_recs: number,
    all_bad_recs: number,
    good_recs: GoodBadRecordType[],
    bad_recs: GoodBadRecordType[]
}



type InitState = {
    data: InitialStateDataType
    status: StatusType,
    errorMessage: string,
}

const initialState: InitState = {
    data: {
        good_per_settings: 0,
        amount_good: 0,
        bad_per_settings: 0,
        amount_bad: 0,
        canceled_good: 0,
        canceled_bad: 0,
        all_good_recs: 0,
        all_bad_recs: 0,
        good_recs: [
            {
                id: 0,
                title: "",
                time_created: "",
                post_marks: "",
                sum_marks: 0,
                is_cancelled: null
            },

        ],
        bad_recs: [
            {
                id: 0,
                title: "",
                time_created: "2023-11-09T08:53:53",
                post_marks: "2/3",
                sum_marks: 28,
                is_cancelled: false
            }
        ]
    },
    status: 'init',
    errorMessage: ''
}

export const operatorReducer = (state = initialState, action: ActionDataType) => {
    switch (action.type) {
        case SET_OPERATOR_DATA: {
            return {
                ...state,
                data: action.data
            }
        }
        case SET_OPERATOR_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_OPERATOR_ERROR: {
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
export const setOperatorData = (data: InitialStateDataType) => {
    return {
        type: SET_OPERATOR_DATA,
        data
    } as const
};

const setOperatorDataStatus = (status: StatusType) => {
    return {
        type: SET_OPERATOR_STATUS,
        status
    } as const
}
export const setOperatorDataStatusError = (errorMessage: string) => {
    return {
        type: SET_OPERATOR_ERROR,
        errorMessage
    } as const
}

export const fetchOperatorData = (id: string, startData: string, endData: string): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setOperatorDataStatus("loading"))
        const {data} = await supervisorOperatorsListAPI.getSupervisorOperatorData(id, startData, endData)
        dispatch(setOperatorData(data))
        dispatch(setOperatorDataStatus("loaded"))
    } catch (e: any) {
        dispatch(setOperatorDataStatus("error"))
        dispatch(setOperatorDataStatusError(e.message))
    }
}
