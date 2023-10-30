import {ThunkAction} from "redux-thunk";
import {StoreType} from "../../store";
import {administratorProfilesAPI} from "../../../s3-dal/d1-administrator/administratorProfilesAPI";
import {administratorAssessmentCriteriaAPI} from "../../../s3-dal/d1-administrator/administratorAssessmentCriteriaAPI";
import {administratorDictionariesAPI} from "../../../s3-dal/d1-administrator/administratorDictionariesAPI";

const SET_ADMINISTRATOR_DICTIONARIES_DATA = "SET_ADMINISTRATOR_DICTIONARIES_DATA";
const SET_ADMINISTRATOR_DICTIONARIES_STATUS = "SET_ADMINISTRATOR_DICTIONARIES_STATUS"
const SET_ADMINISTRATOR_DICTIONARIES_ERROR = "SET_ADMINISTRATOR_DICTIONARIES_ERROR"

type DataThunkAction = ThunkAction<void,
    StoreType,
    void,
    ActionDataType>;

type ActionDataType =
    ReturnType<typeof setAdministratorDictionariesData>
    | ReturnType<typeof setAdministratorDictionariesDataStatus>
    | ReturnType<typeof setAdministratorDictionariesDataStatusError>

export type StatusType = "init" | "loading" | "loaded" | "error"
type InitialStateItemType = {
    id: 0
    title: string
    model_title: string
    color: string
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
                model_title: '',
                color: ''
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

export const administratorDictionariesReducer = (state = initialState, action: ActionDataType) => {
    switch (action.type) {
        case SET_ADMINISTRATOR_DICTIONARIES_DATA: {
            return {
                ...state,
                data: action.data
            }
        }
        case SET_ADMINISTRATOR_DICTIONARIES_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_ADMINISTRATOR_DICTIONARIES_ERROR: {
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
export const setAdministratorDictionariesData = (data: InitialStateDataType) => {
    return {
        type: SET_ADMINISTRATOR_DICTIONARIES_DATA,
        data
    } as const
};

const setAdministratorDictionariesDataStatus = (status: StatusType) => {
    return {
        type: SET_ADMINISTRATOR_DICTIONARIES_STATUS,
        status
    } as const
}
const setAdministratorDictionariesDataStatusError = (errorMessage: string) => {
    return {
        type: SET_ADMINISTRATOR_DICTIONARIES_ERROR,
        errorMessage
    } as const
}

export const fetchAdministratorDictionariesData = (currentPage: number, pageSize: number): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setAdministratorDictionariesDataStatus("loading"))
        const {data} = await administratorDictionariesAPI.getAdministratorDictionariesData(currentPage, pageSize)
        dispatch(setAdministratorDictionariesData(data))
        dispatch(setAdministratorDictionariesDataStatus("loaded"))
    } catch (e: any) {
        dispatch(setAdministratorDictionariesDataStatus("error"))
        dispatch(setAdministratorDictionariesDataStatusError(e.message))
    }
}

export const addNewAdministratorDictionariesData = (title: string, modelTitle: string, color: string): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setAdministratorDictionariesDataStatus("loading"))
        await administratorDictionariesAPI.addAdministratorDictionariesData(title, modelTitle, color)
        dispatch(fetchAdministratorDictionariesData(1,10))
        dispatch(setAdministratorDictionariesDataStatus("loaded"))
    } catch (e: any) {
        dispatch(setAdministratorDictionariesDataStatus("error"))
        dispatch(setAdministratorDictionariesDataStatusError(e.message))
    }
}
export const deleteNewAdministratorDictionariesData = (id: number): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setAdministratorDictionariesDataStatus("loading"))
        await administratorDictionariesAPI.deleteAdministratorDictionariesData(id)
        dispatch(fetchAdministratorDictionariesData(1,10))
        dispatch(setAdministratorDictionariesDataStatus("loaded"))
    } catch (e: any) {
        dispatch(setAdministratorDictionariesDataStatus("error"))
        dispatch(setAdministratorDictionariesDataStatusError(e.message))
    }
}
export const editNewAdministratorDictionariesData = (id: number, title: string, modelTitle: string, color: string): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setAdministratorDictionariesDataStatus("loading"))
        await administratorDictionariesAPI.editAdministratorDictionariesData(id, title, modelTitle, color)
        dispatch(fetchAdministratorDictionariesData(1,10))
        dispatch(setAdministratorDictionariesDataStatus("loaded"))
    } catch (e: any) {
        dispatch(setAdministratorDictionariesDataStatus("error"))
        dispatch(setAdministratorDictionariesDataStatusError(e.message))
    }
}

