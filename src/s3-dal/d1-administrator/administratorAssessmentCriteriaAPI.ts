import {instance} from "../instance";

export const administratorAssessmentCriteriaAPI = {
    getAdministratorAssessmentCriteriaData(page: number, size: number) {
        return instance.get(`evaluation-parameters/?page=${page}&size=${size}`)
    },
    addAdministratorAssessmentCriteriaData(title: string, max_value: number, min_value: number) {
        return instance.post(`evaluation-parameters/`, {title, max_value, min_value})
    },
    deleteAdministratorAssessmentCriteriaData(id: number) {
        return instance.delete(`evaluation-parameters/${id}`)
    },
    editAdministratorAssessmentCriteriaData(id: number, title: string, max_value: number, min_value: number) {
        return instance.put(`evaluation-parameters/${id}`, {title, max_value, min_value})
    },
}