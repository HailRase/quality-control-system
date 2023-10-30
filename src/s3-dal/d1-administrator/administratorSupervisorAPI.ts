import {instance} from "../instance";

export const administratorSupervisorAPI = {
    getAdministratorSupervisorData(page: number, size: number) {
        return instance.get(`supervisors/?page=${page}&size=${size}`)
    },
    addAdministratorSupervisorData(email: string, name: string, lastname: string, surname: string) {
        return instance.post(`supervisors/`, {email, name, lastname, surname})
    },
    deleteAdministratorSupervisorData(id: number) {
        return instance.delete(`supervisors/${id}`)
    },
    editAdministratorSupervisorData(id: number, email: string, name: string, lastname: string, surname: string) {
        return instance.put(`supervisors/${id}`, {email, name, lastname, surname})
    },
    editAdministratorSupervisorPasswordData(id: string, password: string) {
        return instance.put(`supervisors/${id}/password`, {password})
    },
}