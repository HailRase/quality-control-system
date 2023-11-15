import {instance} from "../instance";

export const supervisorHistoryRecordAPI = {
    getChangesRecordHistory(recordId: number) {
        return instance.get(`records/${recordId}/history`)
    }
}