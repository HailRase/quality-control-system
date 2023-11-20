import {instance} from "../instance";

export const supervisorCommentsAPI = {
    getSupervisorCommentsData(recordID: number) {
        return instance.get(`comments/${recordID}`)
    },
    addSupervisorCommentsData(recordID: number, comment: string) {
        return instance.post(`comments/`, {text: comment, record_id: recordID})
    }
    /* getSupervisorOperatorsListData(startDate: string, endDate: string, page: number, size: number) {
         return instance.get(`operators/?time_created__gte=${startDate}&time_created__lte=${endDate}&page=${page}&size=${size}`)
     },
     getSupervisorOperatorData(id: string, startDate: string, endDate: string) {
         return instance.get(`operators/${id}/details?time_created__gte=${startDate}&time_created__lte=${endDate}`)
     },*/
}