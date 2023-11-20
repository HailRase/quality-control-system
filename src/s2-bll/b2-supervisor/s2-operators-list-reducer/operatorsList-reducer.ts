import {ThunkAction} from "redux-thunk";
import {StoreType} from "../../store";
import {administratorSupervisorAPI} from "../../../s3-dal/d1-administrator/administratorSupervisorAPI";
import {AxiosError} from "axios";
import {supervisorOperatorsListAPI} from "../../../s3-dal/d2-supervisor/supervisorOperatorsListAPI";

const SET_OPERATORS_LIST_DATA = "SET_OPERATORS_LIST_DATA";
const SET_OPERATORS_LIST_STATUS = "SET_OPERATORS_LIST_STATUS"
const SET_OPERATORS_LIST_ERROR = "SET_OPERATORS_LIST_ERROR"

type DataThunkAction = ThunkAction<void,
    StoreType,
    void,
    ActionDataType>;

type ActionDataType =
    ReturnType<typeof setOperatorsListData>
    | ReturnType<typeof setOperatorsListDataStatus>
    | ReturnType<typeof setOperatorsListDataStatusError>

export type StatusType = "init" | "loading" | "loaded" | "error"
type InitialStateItemType = {
    id: string,
    name: string,
    all_records: number | null,
    bad_records: number | null,
    good_records: number | null,
    estimate_records: number | null,
    count_marks: number | null
}
export type InitialStateDataType = {
    items: InitialStateItemType[] | []
    total: number,
    page: number,
    size: number,
    pages: number,

}


type InitState = {
    data: InitialStateDataType
    status: StatusType,
    errorMessage: string,
}

const initialState: InitState = {
    data: {
        items: [],
        total: 0,
        page: 1,
        size: 10,
        pages: 0
    },
    status: 'init',
    errorMessage: ''
}

export const operatorsListReducer = (state = initialState, action: ActionDataType) => {
    switch (action.type) {
        case SET_OPERATORS_LIST_DATA: {
            return {
                ...state,
                data: action.data
            }
        }
        case SET_OPERATORS_LIST_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_OPERATORS_LIST_ERROR: {
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
export const setOperatorsListData = (data: InitialStateDataType) => {
    return {
        type: SET_OPERATORS_LIST_DATA,
        data
    } as const
};

const setOperatorsListDataStatus = (status: StatusType) => {
    return {
        type: SET_OPERATORS_LIST_STATUS,
        status
    } as const
}
export const setOperatorsListDataStatusError = (errorMessage: string) => {
    return {
        type: SET_OPERATORS_LIST_ERROR,
        errorMessage
    } as const
}

export const fetchOperatorsListData = (startData: string, endData: string, currentPage: number, pageSize: number, query?: string): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setOperatorsListDataStatus("loading"))
        const {data} = await supervisorOperatorsListAPI.getSupervisorOperatorsListData(startData, endData, currentPage, pageSize, query)
        dispatch(setOperatorsListData(data))
        dispatch(setOperatorsListDataStatus("loaded"))
    } catch (e: any) {
        dispatch(setOperatorsListDataStatus("error"))
        dispatch(setOperatorsListDataStatusError(e.message))
    }
}




