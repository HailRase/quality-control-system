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
        ASSESSMENT: '/evaluate'
    },
    OPERATOR: {
        RECOVERY: '/recovery',
        CHANGE: '/change/:resetPasswordToken'
    },

}