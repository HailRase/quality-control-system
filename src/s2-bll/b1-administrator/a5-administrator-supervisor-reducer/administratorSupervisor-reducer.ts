import {ThunkAction} from "redux-thunk";
import {StoreType} from "../../store";
import {administratorProfilesAPI} from "../../../s3-dal/d1-administrator/administratorProfilesAPI";
import {administratorAssessmentCriteriaAPI} from "../../../s3-dal/d1-administrator/administratorAssessmentCriteriaAPI";
import {administratorDictionariesAPI} from "../../../s3-dal/d1-administrator/administratorDictionariesAPI";
import {administratorSupervisorAPI} from "../../../s3-dal/d1-administrator/administratorSupervisorAPI";

const SET_ADMINISTRATOR_SUPERVISOR_DATA = "SET_ADMINISTRATOR_SUPERVISOR_DATA";
const SET_ADMINISTRATOR_SUPERVISOR_STATUS = "SET_ADMINISTRATOR_SUPERVISOR_STATUS"
const SET_ADMINISTRATOR_SUPERVISOR_ERROR = "SET_ADMINISTRATOR_SUPERVISOR_ERROR"

type DataThunkAction = ThunkAction<void,
    StoreType,
    void,
    ActionDataType>;

type ActionDataType =
    ReturnType<typeof setAdministratorSupervisorData>
    | ReturnType<typeof setAdministratorSupervisorDataStatus>
    | ReturnType<typeof setAdministratorSupervisorDataStatusError>

export type StatusType = "init" | "loading" | "loaded" | "error"
type InitialStateItemType = {
    name: string
    id: string
    email: string
    role: string
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
                name: "",
                id: "",
                email: "",
                role: ""
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

export const administratorSupervisorReducer = (state = initialState, action: ActionDataType) => {
    switch (action.type) {
        case SET_ADMINISTRATOR_SUPERVISOR_DATA: {
            return {
                ...state,
                data: action.data
            }
        }
        case SET_ADMINISTRATOR_SUPERVISOR_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_ADMINISTRATOR_SUPERVISOR_ERROR: {
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
export const setAdministratorSupervisorData = (data: InitialStateDataType) => {
    return {
        type: SET_ADMINISTRATOR_SUPERVISOR_DATA,
        data
    } as const
};

const setAdministratorSupervisorDataStatus = (status: StatusType) => {
    return {
        type: SET_ADMINISTRATOR_SUPERVISOR_STATUS,
        status
    } as const
}
const setAdministratorSupervisorDataStatusError = (errorMessage: string) => {
    return {
        type: SET_ADMINISTRATOR_SUPERVISOR_ERROR,
        errorMessage
    } as const
}

export const fetchAdministratorSupervisorData = (currentPage: number, pageSize: number): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setAdministratorSupervisorDataStatus("loading"))
        const {data} = await administratorSupervisorAPI.getAdministratorSupervisorData(currentPage, pageSize)
        dispatch(setAdministratorSupervisorData(data))
        dispatch(setAdministratorSupervisorDataStatus("loaded"))
    } catch (e: any) {
        dispatch(setAdministratorSupervisorDataStatus("error"))
        dispatch(setAdministratorSupervisorDataStatusError(e.message))
    }
}

export const addNewAdministratorSupervisorData = (email: string, name: string, lastname: string, surname: string): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setAdministratorSupervisorDataStatus("loading"))
        await administratorSupervisorAPI.addAdministratorSupervisorData(email, name, lastname, surname)
        dispatch(fetchAdministratorSupervisorData(1,10))
        dispatch(setAdministratorSupervisorDataStatus("loaded"))
    } catch (e: any) {
        dispatch(setAdministratorSupervisorDataStatus("error"))
        dispatch(setAdministratorSupervisorDataStatusError(e.message))
    }
}
export const deleteNewAdministratorSupervisorData = (id: number): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setAdministratorSupervisorDataStatus("loading"))
        await administratorSupervisorAPI.deleteAdministratorSupervisorData(id)
        dispatch(fetchAdministratorSupervisorData(1,10))
        dispatch(setAdministratorSupervisorDataStatus("loaded"))
    } catch (e: any) {
        dispatch(setAdministratorSupervisorDataStatus("error"))
        dispatch(setAdministratorSupervisorDataStatusError(e.message))
    }
}
export const editNewAdministratorSupervisorData = (id: number, email: string, name: string, lastname: string, surname: string): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setAdministratorSupervisorDataStatus("loading"))
        await administratorSupervisorAPI.editAdministratorSupervisorData(id, email, name, lastname, surname)
        dispatch(fetchAdministratorSupervisorData(1,10))
        dispatch(setAdministratorSupervisorDataStatus("loaded"))
    } catch (e: any) {
        dispatch(setAdministratorSupervisorDataStatus("error"))
        dispatch(setAdministratorSupervisorDataStatusError(e.message))
    }
}
export const editNewAdministratorSupervisorPasswordData = (id: string, password: string): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setAdministratorSupervisorDataStatus("loading"))
        await administratorSupervisorAPI.editAdministratorSupervisorPasswordData(id, password)
        dispatch(fetchAdministratorSupervisorData(1,10))
        dispatch(setAdministratorSupervisorDataStatus("loaded"))
    } catch (e: any) {
        dispatch(setAdministratorSupervisorDataStatus("error"))
        dispatch(setAdministratorSupervisorDataStatusError(e.message))
    }
}

