import {ThunkAction} from "redux-thunk";
import {StoreType} from "../../store";
import {operatorAPI} from "../../../s3-dal/d3-operator/operatorAPI";
import {supervisorOperatorsListAPI} from "../../../s3-dal/d2-supervisor/supervisorOperatorsListAPI";
import {supervisorCommentsAPI} from "../../../s3-dal/d2-supervisor/supervisorCommentsAPI";

const SET_COMMENTS_DATA = "SET_COMMENTS_DATA";
const SET_COMMENTS_STATUS = "SET_COMMENTS_STATUS"
const SET_COMMENTS_ERROR = "SET_COMMENTS_ERROR"

type DataThunkAction = ThunkAction<void,
    StoreType,
    void,
    ActionDataType>;

type ActionDataType =
    ReturnType<typeof setCommentsData>
    | ReturnType<typeof CommentsDataStatus>
    | ReturnType<typeof setCommentsDataStatusError>

export type StatusType = "init" | "loading" | "loaded" | "error"

type InitialStateDataType = {
    created_at: string
    id: number
    text: string
    user_name: string
}

type InitState = {
    data: InitialStateDataType[]
    status: StatusType,
    errorMessage: string,
}

const initialState: InitState = {
    data: [],
    status: 'init',
    errorMessage: ''
}

export const commentsReducer = (state = initialState, action: ActionDataType) => {
    switch (action.type) {
        case SET_COMMENTS_DATA: {
            return {
                ...state,
                data: action.data
            }
        }
        case SET_COMMENTS_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_COMMENTS_ERROR: {
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
export const setCommentsData = (data: InitialStateDataType[]) => {
    return {
        type: SET_COMMENTS_DATA,
        data
    } as const
};

const CommentsDataStatus = (status: StatusType) => {
    return {
        type: SET_COMMENTS_STATUS,
        status
    } as const
}
export const setCommentsDataStatusError = (errorMessage: string) => {
    return {
        type: SET_COMMENTS_ERROR,
        errorMessage
    } as const
}

export const fetchCommentsData = (recordID: number): DataThunkAction => async (dispatch) => {
    try {
        dispatch(CommentsDataStatus("loading"))
        const {data} = await supervisorCommentsAPI.getSupervisorCommentsData(recordID)
        dispatch(setCommentsData(data))
        dispatch(CommentsDataStatus("loaded"))
    } catch (e: any) {
        dispatch(CommentsDataStatus("error"))
        dispatch(setCommentsDataStatusError(e.message))
    }
}
export const addCommentsData = (recordID: number, comment: string): DataThunkAction => async (dispatch) => {
    try {
        await supervisorCommentsAPI.addSupervisorCommentsData(recordID, comment)
        dispatch(fetchCommentsData(recordID))
    } catch (e: any) {
        dispatch(CommentsDataStatus("error"))
        dispatch(setCommentsDataStatusError(e.message))
    }
}




