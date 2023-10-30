import {instance} from "../instance";

export const administratorDictionariesAPI = {
    getAdministratorDictionariesData(page: number, size: number) {
        return instance.get(`dictionaries/?page=${page}&size=${size}`)
    },
    addAdministratorDictionariesData(title: string, model_title: string, color: string) {
        return instance.post(`dictionaries/`, {title, model_title, color})
    },
    deleteAdministratorDictionariesData(id: number) {
        return instance.delete(`dictionaries/${id}`)
    },
    editAdministratorDictionariesData(id: number, title: string, model_title: string, color: string) {
        return instance.put(`dictionaries/${id}`, {title, model_title, color})
    },
}