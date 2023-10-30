import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunkMiddleware from 'redux-thunk'
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {
    administratorProfilesReducer
} from "./b1-administrator/a1-administrator-profiles-reducer/administratorProfiles-reducer";
import {
    administratorAssessmentCriteriaReducer
} from "./b1-administrator/a2-administrator-assessment-criteria-reducer/administratorAssessmentCriteria-reducer";
import {
    administratorCallSettingsReducer
} from "./b1-administrator/a4-administaror-call-settings-reducer/administratorCallSettings-reducer";
import {
    administratorDictionariesReducer
} from "./b1-administrator/a3-administrator-dictionaries-reducer/administratorDictionaries-reducer";
import {
    administratorSupervisorReducer
} from "./b1-administrator/a5-administrator-supervisor-reducer/administratorSupervisor-reducer";


const rootReducer = combineReducers({
    administratorProfilesData: administratorProfilesReducer,
    administratorAssessmentCriteriaData: administratorAssessmentCriteriaReducer,
    administratorDictionariesData: administratorDictionariesReducer,
    administratorCallSettingsData: administratorCallSettingsReducer,
    administratorSupervisorData: administratorSupervisorReducer,
})

const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store

export type StoreType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<StoreType> = useSelector


// @ts-ignore
window.store = store