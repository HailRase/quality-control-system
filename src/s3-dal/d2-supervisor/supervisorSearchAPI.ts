import {instance} from "../instance";

export const supervisorSearchRecordAPI = {
    getSearchData(startPeriod: string, endPeriod: string, phrase: string) {
        return instance.get(`records/search?search=${phrase}&time_created__gte=${startPeriod}&time_created__lte=${endPeriod}`)
    },
    getSearchUserData(userID: string, phrase: string, startPeriod: string, endPeriod: string, page: number, size: number, query?:string) {
        if (query){
            return instance.get(`records/${userID}/search_user_records?search=${phrase}&search_title=${query}&time_created__gte=${startPeriod}&time_created__lte=${endPeriod}&page=${page}&size=${size}`)
        }
        return instance.get(`records/${userID}/search_user_records?search=${phrase}&time_created__gte=${startPeriod}&time_created__lte=${endPeriod}&page=${page}&size=${size}`)
    }
}