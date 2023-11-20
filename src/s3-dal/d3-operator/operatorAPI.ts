import {instance} from "../instance";

export const operatorAPI = {
    getOperatorNameData(userId: string) {
        return instance.get(`users/${userId}/name`)
    }
}