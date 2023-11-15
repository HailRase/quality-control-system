import {instance} from "../instance";

export const supervisorOperatorsListAPI = {
    getSupervisorOperatorsListStatisticsData(startDate: string, endDate: string) {
        return instance.get(`operators/statistics?time_created__gte=${startDate}&time_created__lte=${endDate}`)
    },
    getSupervisorOperatorsListData(startDate: string, endDate: string, page: number, size: number) {
        return instance.get(`operators/?time_created__gte=${startDate}&time_created__lte=${endDate}&page=${page}&size=${size}`)
    },
    getSupervisorOperatorData(id: string, startDate: string, endDate: string) {
        return instance.get(`operators/${id}/details?time_created__gte=${startDate}&time_created__lte=${endDate}`)
    },
}