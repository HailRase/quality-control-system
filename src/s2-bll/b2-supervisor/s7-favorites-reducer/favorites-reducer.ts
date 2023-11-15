import {ThunkAction} from "redux-thunk";
import {StoreType} from "../../store";
import {supervisorFavoritesRecordAPI} from "../../../s3-dal/d2-supervisor/supervisorFavoritesRecordAPI";

const SET_FAVORITES_DATA = "SET_FAVORITES_DATA";
const SET_FAVORITES_STATUS = "SET_FAVORITES_STATUS"
const SET_FAVORITES_ERROR = "SET_FAVORITES_ERROR"

type DataThunkAction = ThunkAction<void,
    StoreType,
    void,
    ActionDataType>;

type ActionDataType =
    ReturnType<typeof setFavoritesData>
    | ReturnType<typeof setFavoritesDataStatus>
    | ReturnType<typeof setFavoritesDataStatusError>

export type StatusType = "init" | "loading" | "loaded" | "error"
export type ManualEvaluationsType = {
    id: number,
    title: string,
    mark: number
}
type InitialStateDataType = {
    manual_evaluations: ManualEvaluationsType[],
    id: number,
    user_name: string,
    url_rec: string
}

type InitState = {
    data: InitialStateDataType[]
    status: StatusType,
    errorMessage: string,
}

const initialState: InitState = {
    data: [
        {
            manual_evaluations: [],
            id: 0,
            user_name: '',
            url_rec: ''
        }
    ],
    status: 'init',
    errorMessage: ''
}

export const favoritesReducer = (state = initialState, action: ActionDataType) => {
    switch (action.type) {
        case SET_FAVORITES_DATA: {
            return {
                ...state,
                data: action.data
            }
        }
        case SET_FAVORITES_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_FAVORITES_ERROR: {
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
export const setFavoritesData = (data: InitialStateDataType[]) => {
    return {
        type: SET_FAVORITES_DATA,
        data
    } as const
};

const setFavoritesDataStatus = (status: StatusType) => {
    return {
        type: SET_FAVORITES_STATUS,
        status
    } as const
}
export const setFavoritesDataStatusError = (errorMessage: string) => {
    return {
        type: SET_FAVORITES_ERROR,
        errorMessage
    } as const
}

export const fetchFavoritesData = (): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setFavoritesDataStatus("loading"))
        const {data} = await supervisorFavoritesRecordAPI.getFavoritesRecord()
        dispatch(setFavoritesData(data))
        dispatch(setFavoritesDataStatus("loaded"))
    } catch (e: any) {
        dispatch(setFavoritesDataStatus("error"))
        dispatch(setFavoritesDataStatusError(e.message))
    }
}

export const addRecordToFavorites = (recordID: number): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setFavoritesDataStatus("loading"))
        await supervisorFavoritesRecordAPI.addRecordToFavorites(recordID)
        dispatch(setFavoritesDataStatus("loaded"))
    } catch (e: any) {
        dispatch(setFavoritesDataStatus("error"))
        dispatch(setFavoritesDataStatusError(e.message))
    }
}
export const deleteRecordFromFavorites = (recordID: number): DataThunkAction => async (dispatch) => {
    try {
        dispatch(setFavoritesDataStatus("loading"))
        await supervisorFavoritesRecordAPI.deleteRecordFromFavorites(recordID)
        dispatch(setFavoritesDataStatus("loaded"))
    } catch (e: any) {
        dispatch(setFavoritesDataStatus("error"))
        dispatch(setFavoritesDataStatusError(e.message))
    }
}

