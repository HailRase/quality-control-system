import {ThunkAction} from "redux-thunk";
import {StoreType} from "../../store";
import {administratorSupervisorAPI} from "../../../s3-dal/d1-administrator/administratorSupervisorAPI";
import {AxiosError} from "axios";

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
    id: string,
    name: string,
    email: string,
    role: string,
    login: string
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
                id: '',
                name: '',
                email: '',
                role: '',
                login: ''
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
export const setAdministratorSupervisorDataStatusError = (errorMessage: string) => {
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

export const addNewAdministratorSupervisorData = (name: string, password: string, email: string, login: string): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setAdministratorSupervisorDataStatus("loading"))
        const {status} = await administratorSupervisorAPI.addAdministratorSupervisorData(name, password, email, login)
        status === 200
            ? dispatch(setAdministratorSupervisorDataStatusError('Успешно добавлено!'))
            : dispatch(setAdministratorSupervisorDataStatus("error"))
        dispatch(fetchAdministratorSupervisorData(1,10))
        dispatch(setAdministratorSupervisorDataStatus("loaded"))
    } catch (e: any) {
        console.log(e)
        dispatch(setAdministratorSupervisorDataStatus("error"))
        dispatch(setAdministratorSupervisorDataStatusError(e.message))
    }
}
export const deleteNewAdministratorSupervisorData = (id: number): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setAdministratorSupervisorDataStatus("loading"))
        const {status} = await administratorSupervisorAPI.deleteAdministratorSupervisorData(id)
        status === 200
            ? dispatch(setAdministratorSupervisorDataStatusError('Успешно удалено!'))
            : dispatch(setAdministratorSupervisorDataStatus("error"))
        dispatch(fetchAdministratorSupervisorData(1,10))
        dispatch(setAdministratorSupervisorDataStatus("loaded"))
    } catch (e: any) {
        dispatch(setAdministratorSupervisorDataStatus("error"))
        dispatch(setAdministratorSupervisorDataStatusError(e.message))
    }
}
export const editNewAdministratorSupervisorData = (id: string, email: string, name: string, login: string): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setAdministratorSupervisorDataStatus("loading"))
        const {status} = await administratorSupervisorAPI.editAdministratorSupervisorData(id, email, name, login)
        status === 200
            ? dispatch(setAdministratorSupervisorDataStatusError('Успешно изменено!'))
            : dispatch(setAdministratorSupervisorDataStatus("error"))
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
        const {status} = await administratorSupervisorAPI.editAdministratorSupervisorPasswordData(id, password)
        status === 200
            ? dispatch(setAdministratorSupervisorDataStatusError('Успешно изменено!'))
            : dispatch(setAdministratorSupervisorDataStatus("error"))
        dispatch(fetchAdministratorSupervisorData(1,10))
        dispatch(setAdministratorSupervisorDataStatus("loaded"))
    } catch (e: any) {
        dispatch(setAdministratorSupervisorDataStatus("error"))
        dispatch(setAdministratorSupervisorDataStatusError(e.message))
    }
}

