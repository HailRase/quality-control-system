import {instance} from "../instance";

export const administratorSupervisorAPI = {
    getAdministratorSupervisorData(page: number, size: number) {
        return instance.get(`supervisors/?page=${page}&size=${size}`)
    },
    addAdministratorSupervisorData(name: string, password: string, email: string, login: string) {
        return instance.post(`supervisors/create`, {name, password, email, login})
    },
    deleteAdministratorSupervisorData(id: number) {
        return instance.delete(`supervisors/${id}`)
    },
    editAdministratorSupervisorData(id: string, email: string, name: string, login: string) {
        return instance.put(`supervisors/${id}`, {email, name, login})
    },
    editAdministratorSupervisorPasswordData(id: string, password: string) {
        return instance.put(`supervisors/${id}/password`, {password})
    },
}