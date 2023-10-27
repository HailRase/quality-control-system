import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {
    administratorProfilesReducer
} from "./b1-administrator/a1-administrator-profiles-reducer/administratorProfiles-reducer";
import {
    administratorAssessmentCriteriaReducer
} from "./b1-administrator/a2-administrator-assessment-criteria-reducer/administratorAssessmentCriteria-reducer";


const rootReducer = combineReducers({
    administratorProfilesData: administratorProfilesReducer,
    administratorAssessmentCriteria: administratorAssessmentCriteriaReducer,
})

const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store

export type StoreType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<StoreType> = useSelector


// @ts-ignore
window.store = store