import {instance} from "../instance";

export const supervisorOperatorsListAPI = {
    getSupervisorOperatorsListStatisticsData(startDate: string, endDate: string) {
        return instance.get(`operators/statistics?time_created__gte=${startDate}&time_created__lte=${endDate}`)
    },
    getSupervisorOperatorsListData(startDate: string, endDate: string, page: number, size: number, query?:string) {
        if (query) {
            return instance.get(`operators/?search=${query}&time_created__gte=${startDate}&time_created__lte=${endDate}&page=${page}&size=${size}`)
        }
        return instance.get(`operators/?time_created__gte=${startDate}&time_created__lte=${endDate}&page=${page}&size=${size}`)
    },
    getSupervisorOperatorData(id: string, startDate: string, endDate: string, query?: string) {
        if (query){
            return instance.get(`operators/${id}/details?search=${query}&time_created__gte=${startDate}&time_created__lte=${endDate}`)
        }
        return instance.get(`operators/${id}/details?time_created__gte=${startDate}&time_created__lte=${endDate}`)
    },
    getBonusData(eval_recs: number, arrIdRec: number[]) {
        return instance.post(`operators/bonus?eval_recs=${eval_recs}`, arrIdRec)
    },
    loadExcelStatistic(startDate: string, endDate: string, statObj: {good_records: number,bad_records: number,all_records: number,}) {
        return instance.post(`operators/load_exel?time_created__gte=${startDate}&time_created__lte=${endDate}`, statObj, {
            responseType: 'blob'
        })
    },

}