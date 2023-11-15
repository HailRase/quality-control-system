export const PATH = {
    AUTH: {
        LOGIN: '/login',
    },
    ADMINISTRATOR: {
        PROFILES: '/profiles',
        ASSESSMENT_CRITERIA: '/assessment-criteria',
        DICTIONARIES: '/dictionaries',
        CALL_SETTINGS: '/call-settings',
        SUPERVISORS: '/supervisors',
    },
    SUPERVISOR: {
        OPERATOR_LIST: '/operator-list',
        OPERATOR: '/operator/:userID',
        ASSESSMENT: '/evaluate/:recordID',
        FAVORITES: '/favorites',
        SEARCH: '/search',
        SEARCH_QUERY: '/search/:userID',
        HISTORY: '/history/:recordID',
    },
    OPERATOR: {
        RECOVERY: '/recovery',
        CHANGE: '/change/:resetPasswordToken'
    },

}