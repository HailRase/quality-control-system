export const PATH = {
    AUTH: {
        LOGIN: '/login',
    },
    ADMINISTRATOR: {
        PROFILES: '/',
        ASSESSMENT_CRITERIA: '/assessment-criteria',
        DICTIONARIES: '/dictionaries',
        CALL_SETTINGS: '/call-settings',
        SUPERVISORS: '/supervisors',
    },
    SUPERVISOR: {
        PROFILE: '/edit/profile',
        PACK: '/edit/pack/:packId',
        CARD: '/edit/card/:cardId'
    },
    OPERATOR: {
        RECOVERY: '/recovery',
        CHANGE: '/change/:resetPasswordToken'
    },

}