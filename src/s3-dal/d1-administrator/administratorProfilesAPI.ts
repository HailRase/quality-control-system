import {instance} from "../instance";

export const administratorProfilesAPI = {
    getAdministratorProfilesData(page: number, size: number, searchParam?: string) {
        if (searchParam){
            return instance.get(`users/?search=${searchParam}&page=${page}&size=${size}`)
        }
        return instance.get(`users/?page=${page}&size=${size}`)
    }
}