import { axiosConfig } from "../helpers/axios-config";

const getDirector = async () => {
   return axiosConfig.get('director');
}

const createDirector = (data) => {
    return axiosConfig.post('director', data);
}

const updateDirector = (directorId, data) => {
    return axiosConfig.put(`director/${directorId}`, data);
}

const deleteDirector = async (directorId) => {
    return axiosConfig.delete(`director/${directorId}`);
}

export {
    getDirector,
    createDirector,
    updateDirector,
    deleteDirector
};