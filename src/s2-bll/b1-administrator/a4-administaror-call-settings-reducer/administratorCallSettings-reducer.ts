import {ThunkAction} from "redux-thunk";
import {StoreType} from "../../store";
import {administratorProfilesAPI} from "../../../s3-dal/d1-administrator/administratorProfilesAPI";
import {administratorCallSettingsAPI} from "../../../s3-dal/d1-administrator/administratorCallSettingsAPI";

const SET_ADMINISTRATOR_CALL_SETTINGS_DATA = "SET_ADMINISTRATOR_CALL_SETTINGS_DATA";
const SET_ADMINISTRATOR_CALL_SETTINGS_STATUS = "SET_ADMINISTRATOR_CALL_SETTINGS_STATUS"
const SET_ADMINISTRATOR_CALL_SETTINGS_ERROR = "SET_ADMINISTRATOR_CALL_SETTINGS_ERROR"

type DataThunkAction = ThunkAction<void,
    StoreType,
    void,
    ActionDataType>;

type ActionDataType =
    ReturnType<typeof setAdministratorCallSettingsData>
    | ReturnType<typeof setAdministratorCallSettingsDataStatus>
    | ReturnType<typeof setAdministratorCallSettingsDataStatusError>

export type StatusType = "init" | "loading" | "loaded" | "error"

interface InitialStateDataType {
    good_calls: number,
    bad_calls: number
}

type InitState = {
    data: InitialStateDataType,
    status: StatusType,
    errorMessage: string,
}

const initialState: InitState = {
    data: {
        good_calls: 0,
        bad_calls: 0
    },
    status: 'init',
    errorMessage: ''
}

export const administratorCallSettingsReducer = (state = initialState, action: ActionDataType) => {
    switch (action.type) {
        case SET_ADMINISTRATOR_CALL_SETTINGS_DATA: {
            return {
                ...state,
                data: action.data
            }
        }
        case SET_ADMINISTRATOR_CALL_SETTINGS_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_ADMINISTRATOR_CALL_SETTINGS_ERROR: {
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
export const setAdministratorCallSettingsData = (data: InitialStateDataType) => {
    return {
        type: SET_ADMINISTRATOR_CALL_SETTINGS_DATA,
        data
    } as const
};

const setAdministratorCallSettingsDataStatus = (status: StatusType) => {
    return {
        type: SET_ADMINISTRATOR_CALL_SETTINGS_STATUS,
        status
    } as const
}
const setAdministratorCallSettingsDataStatusError = (errorMessage: string) => {
    return {
        type: SET_ADMINISTRATOR_CALL_SETTINGS_ERROR,
        errorMessage
    } as const
}

export const fetchAdministratorCallSettingsData = (): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setAdministratorCallSettingsDataStatus("loading"))
        const {data} = await administratorCallSettingsAPI.getAdministratorCallSettingsData()
        dispatch(setAdministratorCallSettingsData(data))
        dispatch(setAdministratorCallSettingsDataStatus("loaded"))
    } catch (e: any) {
        dispatch(setAdministratorCallSettingsDataStatus("error"))
        dispatch(setAdministratorCallSettingsDataStatusError(e.message))
    }
}
export const editAdministratorCallSettingsData = (goodCalls: number, badCalls: number): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setAdministratorCallSettingsDataStatus("loading"))
        await administratorCallSettingsAPI.editAdministratorCallSettingsData(goodCalls, badCalls)
        dispatch(fetchAdministratorCallSettingsData())
        dispatch(setAdministratorCallSettingsDataStatus("loaded"))
    } catch (e: any) {
        dispatch(setAdministratorCallSettingsDataStatus("error"))
        dispatch(setAdministratorCallSettingsDataStatusError(e.message))
    }
}