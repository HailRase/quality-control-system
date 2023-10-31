import {instance} from "../instance";

export const authAPI = {
    login(username: string, password: string) {
        return instance.post(`login`, {login: username, password})
    },
    me() {
        return instance.post(`current_user`)
    }
}