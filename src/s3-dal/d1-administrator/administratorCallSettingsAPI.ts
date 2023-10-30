import {instance} from "../instance";

export const administratorCallSettingsAPI = {
    getAdministratorCallSettingsData() {
        return instance.get(`call-settings/`)
    },
    editAdministratorCallSettingsData(good_calls: number, bad_calls: number) {
        return instance.put(`call-settings/`, {good_calls, bad_calls})
    }
}