import {ThunkAction} from "redux-thunk";
import {StoreType} from "../../store";
import {administratorProfilesAPI} from "../../../s3-dal/d1-administrator/administratorProfilesAPI";

const SET_ADMINISTRATOR_PROFILES_DATA = "SET_ADMINISTRATOR_PROFILES_DATA";
const SET_ADMINISTRATOR_PROFILES_STATUS = "SET_ADMINISTRATOR_PROFILES_STATUS"
const SET_ADMINISTRATOR_PROFILES_ERROR = "SET_ADMINISTRATOR_PROFILES_ERROR"

type DataThunkAction = ThunkAction<void,
    StoreType,
    void,
    ActionDataType>;

type ActionDataType =
    ReturnType<typeof setAdministratorProfilesData>
    | ReturnType<typeof setAdministratorProfilesDataStatus>
    | ReturnType<typeof setAdministratorProfilesDataStatusError>

export type StatusType = "init" | "loading" | "loaded" | "error"
type InitialStateItemType = {
    name: string
    lastname: string
    surname: string
    id: string
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
                name: "test",
                lastname: "test",
                surname: "test",
                id: "000de131-65f7-41b4-aa0a-25ca978dae41",
                role: "Оператор"
            },
            {
                name: "Соловьева Анастасия",
                lastname: "Соловьева Анастасия",
                surname: "Соловьева Анастасия",
                id: "02e6ba88-3cd0-4936-91ef-68b1ca17a405",
                role: "Оператор"
            }
        ],
        total: 0,
        page: 1,
        size: 10,
        pages: 0,
    },
    status: 'init',
    errorMessage: ''
}

export const administratorProfilesReducer = (state = initialState, action: ActionDataType) => {
    switch (action.type) {
        case SET_ADMINISTRATOR_PROFILES_DATA: {
            return {
                ...state,
                data: action.data
            }
        }
        case SET_ADMINISTRATOR_PROFILES_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_ADMINISTRATOR_PROFILES_ERROR: {
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
export const setAdministratorProfilesData = (data: InitialStateDataType) => {
    return {
        type: SET_ADMINISTRATOR_PROFILES_DATA,
        data
    } as const
};

const setAdministratorProfilesDataStatus = (status: StatusType) => {
    return {
        type: SET_ADMINISTRATOR_PROFILES_STATUS,
        status
    } as const
}
const setAdministratorProfilesDataStatusError = (errorMessage: string) => {
    return {
        type: SET_ADMINISTRATOR_PROFILES_ERROR,
        errorMessage
    } as const
}

export const fetchAdministratorProfilesData = (currentPage: number, pageSize: number,searchParam?: string): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setAdministratorProfilesDataStatus("loading"))
        const {data} = await administratorProfilesAPI.getAdministratorProfilesData(currentPage, pageSize,searchParam)
        dispatch(setAdministratorProfilesData(data))
        dispatch(setAdministratorProfilesDataStatus("loaded"))
    } catch (e: any) {
        dispatch(setAdministratorProfilesDataStatus("error"))
        dispatch(setAdministratorProfilesDataStatusError(e.message))
    }
}