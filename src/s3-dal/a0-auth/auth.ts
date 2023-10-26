import {instance} from "../instance";

export const administratorProfilesAPI = {
    authMe(username: string, password: string) {
        return instance.post(`login`, {username, password})
    }
}