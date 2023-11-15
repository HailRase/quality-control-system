import {instance} from "../instance";

export const supervisorFavoritesRecordAPI = {
    getFavoritesRecord() {
        return instance.get(`records/favorites`)
    },
    addRecordToFavorites (recordID: number){
        return instance.post(`records/${recordID}/to_favorite`)
    },
    deleteRecordFromFavorites (recordID: number) {
        return instance.delete(`records/${recordID}/delete_favorite`)
    }
}