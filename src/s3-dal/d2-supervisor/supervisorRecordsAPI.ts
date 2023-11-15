import {instance} from "../instance";

export const supervisorRecordsAPI = {
    getSupervisorRecordsDetailsData(id: number) {
        return instance.get(`records/${id}/details`)
    },
   /* getSupervisorOperatorsListData(startDate: string, endDate: string, page: number, size: number) {
        return instance.get(`operators/?time_created__gte=${startDate}&time_created__lte=${endDate}&page=${page}&size=${size}`)
    },
    getSupervisorOperatorData(id: string, startDate: string, endDate: string) {
        return instance.get(`operators/${id}/details?time_created__gte=${startDate}&time_created__lte=${endDate}`)
    },*/
}