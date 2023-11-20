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
import {authReducer} from "./b1-auth/auth-reducer";
import {initializeReducer} from "./b0-initialize-reducer/initialize-reducer";
import {
    operatorsListStatisticsReducer
} from "./b2-supervisor/s1-operators-list-statistics-reducer/operatorsLlistStatistics-reducer";
import {operatorsListReducer} from "./b2-supervisor/s2-operators-list-reducer/operatorsList-reducer";
import {operatorReducer} from "./b2-supervisor/s3-operator-reducer/operator-reducer";
import {favoritesReducer} from "./b2-supervisor/s7-favorites-reducer/favorites-reducer";
import {historyReducer} from "./b2-supervisor/s8-history-reducer/history-reducer";
import {searchReducer} from "./b2-supervisor/s4-search-reducer/search-reducer";
import {searchQueryReducer} from "./b2-supervisor/s4-search-reducer/searchQuery-reducer";
import {searchQueryParamsReducer} from "./b2-supervisor/s4-search-reducer/searchQueryParams-reducer";
import {operatorNameReducer} from "./b3-operator/o1-operator-name-reducer/operatorName-reducer";
import {operatorsListDateReducer} from "./b2-supervisor/s2-operators-list-reducer/operatorListDate-reducer";
import {bonusReducer} from "./b2-supervisor/s9-bonus-reducer/bonus-reducer";
import {statisticReducer} from "./b2-supervisor/s2-operators-list-reducer/statistic-reducer";
import {
    operatorRecordDetailsReducer
} from "./b2-supervisor/s5-operator-record-details-reducer/operatorRecordDetails-reducer";
import {commentsReducer} from "./b2-supervisor/s10-comments-reducer/comments-reducer";


const rootReducer = combineReducers({
    initializeData: initializeReducer,
    authData: authReducer,
    administratorProfilesData: administratorProfilesReducer,
    administratorAssessmentCriteriaData: administratorAssessmentCriteriaReducer,
    administratorDictionariesData: administratorDictionariesReducer,
    administratorCallSettingsData: administratorCallSettingsReducer,
    administratorSupervisorData: administratorSupervisorReducer,
    supervisorOperatorsListStatisticsData: operatorsListStatisticsReducer,
    supervisorOperatorsListData: operatorsListReducer,
    supervisorOperatorsListDateData: operatorsListDateReducer,
    supervisorOperatorRecordDetailsData: operatorRecordDetailsReducer,
    supervisorStatisticData: statisticReducer,
    supervisorBonusData: bonusReducer,
    supervisorCommentsData: commentsReducer,
    supervisorOperatorData: operatorReducer,
    supervisorFavoritesData: favoritesReducer,
    supervisorHistoryData: historyReducer,
    supervisorSearchData: searchReducer,
    supervisorSearchQueryData: searchQueryReducer,
    supervisorSearchQueryParamsData: searchQueryParamsReducer,
    operatorNameData: operatorNameReducer,
})

const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store

export type StoreType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<StoreType> = useSelector


// @ts-ignore
window.store = store