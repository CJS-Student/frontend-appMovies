import { axiosConfig } from "../helpers/axios-config";

const getMedias = async () => {
   return axiosConfig.get('media');
}

const createMedias = (data) => {
    return axiosConfig.post('media', data);
}

const updateMedias = (mediaId, data) => {
    return axiosConfig.put(`media/${mediaId}`, data);
}

const deleteMedias = async (mediaId) => {
    return axiosConfig.delete(`media/${mediaId}`);
}

const getMediaPorId = async (mediaId) => {
    return axiosConfig.get(`media/${mediaId}`);
}

export {
    getMedias,
    createMedias,
    updateMedias,
    deleteMedias,
    getMediaPorId
};