import {ThunkAction} from "redux-thunk";
import {StoreType} from "../../store";
import {administratorAssessmentCriteriaAPI} from "../../../s3-dal/d1-administrator/administratorAssessmentCriteriaAPI";

const SET_ADMINISTRATOR_ASSESSMENT_CRITERIA_DATA = "SET_ADMINISTRATOR_ASSESSMENT_CRITERIA_DATA";
const SET_ADMINISTRATOR_ASSESSMENT_CRITERIA_STATUS = "SET_ADMINISTRATOR_ASSESSMENT_CRITERIA_STATUS"
const SET_ADMINISTRATOR_ASSESSMENT_CRITERIA_ERROR = "SET_ADMINISTRATOR_ASSESSMENT_CRITERIA_ERROR"

type DataThunkAction = ThunkAction<void,
    StoreType,
    void,
    ActionDataType>;

type ActionDataType =
    ReturnType<typeof setAdministratorAssessmentCriteriaData>
    | ReturnType<typeof setAdministratorAssessmentCriteriaDataStatus>
    | ReturnType<typeof setAdministratorAssessmentCriteriaDataStatusError>

export type StatusType = "init" | "loading" | "loaded" | "error"
type InitialStateItemType = {
    id: number,
    title: string,
    max_value: number,
    min_value: number
}
export type InitialStateDataType = {
    items: InitialStateItemType[]
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
        items: [
            {
                id: 0,
                title: "Отсутсвие ошибок дежурного при разговоре",
                max_value: 10,
                min_value: 0
            }
        ],
        total: 0,
        page: 1,
        size: 10,
        pages: 0
    },
    status: 'init',
    errorMessage: ''
}

export const administratorAssessmentCriteriaReducer = (state = initialState, action: ActionDataType) => {
    switch (action.type) {
        case SET_ADMINISTRATOR_ASSESSMENT_CRITERIA_DATA: {
            return {
                ...state,
                data: action.data
            }
        }
        case SET_ADMINISTRATOR_ASSESSMENT_CRITERIA_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_ADMINISTRATOR_ASSESSMENT_CRITERIA_ERROR: {
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
export const setAdministratorAssessmentCriteriaData = (data: InitialStateDataType) => {
    return {
        type: SET_ADMINISTRATOR_ASSESSMENT_CRITERIA_DATA,
        data
    } as const
};

const setAdministratorAssessmentCriteriaDataStatus = (status: StatusType) => {
    return {
        type: SET_ADMINISTRATOR_ASSESSMENT_CRITERIA_STATUS,
        status
    } as const
}
export const setAdministratorAssessmentCriteriaDataStatusError = (errorMessage: string) => {
    return {
        type: SET_ADMINISTRATOR_ASSESSMENT_CRITERIA_ERROR,
        errorMessage
    } as const
}

export const fetchAdministratorAssessmentCriteriaData = (currentPage: number, pageSize: number): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setAdministratorAssessmentCriteriaDataStatus("loading"))
        const {data} = await administratorAssessmentCriteriaAPI.getAdministratorAssessmentCriteriaData(currentPage, pageSize)
        dispatch(setAdministratorAssessmentCriteriaData(data))
        dispatch(setAdministratorAssessmentCriteriaDataStatus("loaded"))
    } catch (e: any) {
        dispatch(setAdministratorAssessmentCriteriaDataStatus("error"))
        dispatch(setAdministratorAssessmentCriteriaDataStatusError(e.message))
    }
}

export const addNewAdministratorAssessmentCriteriaData = (title: string, max_value: number, min_value: number): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setAdministratorAssessmentCriteriaDataStatus("loading"))
        const {status} = await administratorAssessmentCriteriaAPI.addAdministratorAssessmentCriteriaData(title, max_value, min_value)
        status === 200
            ? dispatch(setAdministratorAssessmentCriteriaDataStatusError('Успешно добавлено!'))
            : dispatch(setAdministratorAssessmentCriteriaDataStatus("error"))
        dispatch(fetchAdministratorAssessmentCriteriaData(1,10))
        dispatch(setAdministratorAssessmentCriteriaDataStatus("loaded"))
    } catch (e: any) {
        dispatch(setAdministratorAssessmentCriteriaDataStatus("error"))
        dispatch(setAdministratorAssessmentCriteriaDataStatusError(e.message))
    }
}
export const deleteNewAdministratorAssessmentCriteriaData = (id: number): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setAdministratorAssessmentCriteriaDataStatus("loading"))
        const {status} = await administratorAssessmentCriteriaAPI.deleteAdministratorAssessmentCriteriaData(id)
        status === 200
            ? dispatch(setAdministratorAssessmentCriteriaDataStatusError('Успешно удалено!'))
            : dispatch(setAdministratorAssessmentCriteriaDataStatus("error"))
        dispatch(fetchAdministratorAssessmentCriteriaData(1,10))
        dispatch(setAdministratorAssessmentCriteriaDataStatus("loaded"))
    } catch (e: any) {
        dispatch(setAdministratorAssessmentCriteriaDataStatus("error"))
        dispatch(setAdministratorAssessmentCriteriaDataStatusError(e.message))
    }
}
export const editNewAdministratorAssessmentCriteriaData = (id: number, title: string, max_value: number, min_value: number): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setAdministratorAssessmentCriteriaDataStatus("loading"))
        const {status} = await administratorAssessmentCriteriaAPI.editAdministratorAssessmentCriteriaData(id, title, max_value, min_value)
        status === 200
            ? dispatch(setAdministratorAssessmentCriteriaDataStatusError('Успешно изменено!'))
            : dispatch(setAdministratorAssessmentCriteriaDataStatus("error"))
        dispatch(fetchAdministratorAssessmentCriteriaData(1,10))
        dispatch(setAdministratorAssessmentCriteriaDataStatus("loaded"))
    } catch (e: any) {
        dispatch(setAdministratorAssessmentCriteriaDataStatus("error"))
        dispatch(setAdministratorAssessmentCriteriaDataStatusError(e.message))
    }
}

