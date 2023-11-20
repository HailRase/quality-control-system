import {ThunkAction} from "redux-thunk";
import {StoreType} from "../../store";
import {supervisorOperatorsListAPI} from "../../../s3-dal/d2-supervisor/supervisorOperatorsListAPI";
import {supervisorRecordsAPI} from "../../../s3-dal/d2-supervisor/supervisorRecordsAPI";

const SET_OPERATOR_RECORD_DETAILS_DATA = "SET_OPERATOR_RECORD_DETAILS_DATA";
const SET_OPERATOR_RECORD_DETAILS_STATUS = "SET_OPERATOR_RECORD_DETAILS_STATUS"
const SET_OPERATOR_RECORD_DETAILS_ERROR = "SET_OPERATOR_RECORD_DETAILS_ERROR"

type DataThunkAction = ThunkAction<void,
    StoreType,
    void,
    ActionDataType>;

type ActionDataType =
    ReturnType<typeof setOperatorRecordDetailsData>
    | ReturnType<typeof setOperatorRecordDetailsDataStatus>
    | ReturnType<typeof setOperatorRecordDetailsDataStatusError>

export type StatusType = "init" | "loading" | "loaded" | "error"
type TranscriptionType = {
    id: string
    speaker: string
    text: string
}
type InitialStateDataType = {
    time_created: string
    audio_file: string
    is_fav: boolean
    transcription: TranscriptionType[]
    client_name: string
    client_phone: string
    type_call: string
    agent_phone: string
    url_rec: string
}



type InitState = {
    data: InitialStateDataType
    status: StatusType,
    errorMessage: string,
}

const initialState: InitState = {
    data: {
        time_created: '',
        audio_file: '',
        is_fav: false,
        transcription: [],
        client_name: '',
        client_phone: '',
        type_call: '',
        agent_phone: '',
        url_rec: ''
    },
    status: 'init',
    errorMessage: ''
}

export const operatorRecordDetailsReducer = (state = initialState, action: ActionDataType) => {
    switch (action.type) {
        case SET_OPERATOR_RECORD_DETAILS_DATA: {
            return {
                ...state,
                data: action.data
            }
        }
        case SET_OPERATOR_RECORD_DETAILS_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_OPERATOR_RECORD_DETAILS_ERROR: {
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
export const setOperatorRecordDetailsData = (data: InitialStateDataType) => {
    return {
        type: SET_OPERATOR_RECORD_DETAILS_DATA,
        data
    } as const
};

const setOperatorRecordDetailsDataStatus = (status: StatusType) => {
    return {
        type: SET_OPERATOR_RECORD_DETAILS_STATUS,
        status
    } as const
}
export const setOperatorRecordDetailsDataStatusError = (errorMessage: string) => {
    return {
        type: SET_OPERATOR_RECORD_DETAILS_ERROR,
        errorMessage
    } as const
}

export const fetchOperatorRecordDetailsData = (recordID: number): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setOperatorRecordDetailsDataStatus("loading"))
        const {data} = await supervisorRecordsAPI.getSupervisorOperatorRecordDetailsData(recordID)
        dispatch(setOperatorRecordDetailsData(data))
        dispatch(setOperatorRecordDetailsDataStatus("loaded"))
    } catch (e: any) {
        dispatch(setOperatorRecordDetailsDataStatus("error"))
        dispatch(setOperatorRecordDetailsDataStatusError(e.message))
    }
}
