import {ThunkAction} from "redux-thunk";
import {StoreType} from "../store";
import {getAuthData} from "../b1-auth/auth-reducer";


type DataThunkAction = ThunkAction<void,
    StoreType,
    void,
    ActionDataType>;

const INITIALIZED_SUCCESS = 'INITIALIZED-SUCCESS'

type ActionDataType = ReturnType<typeof initializedSuccess>

type InitialStateType = {
    initialized: boolean
}

let initialState: InitialStateType = {
    initialized: false
}

export const initializeReducer = (state = initialState, action: ActionDataType): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export const initializedSuccess = () => {
    return {
        type: INITIALIZED_SUCCESS
    } as const
}

export const initialize =  (): DataThunkAction => async (dispatch) => {
    await dispatch(getAuthData())
    dispatch(initializedSuccess())
}
