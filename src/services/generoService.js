import { axiosConfig } from "../helpers/axios-config";

const getGenero = async () => {
   return axiosConfig.get('genero');
}

const createGenero = (data) => {
    return axiosConfig.post('genero', data);
}

const updateGenero = (generoId, data) => {
    return axiosConfig.put(`genero/${generoId}`, data);
}

const deleteGenero = async (generoId) => {
    return axiosConfig.delete(`genero/${generoId}`);
}

export {
    getGenero,
    createGenero,
    updateGenero,
    deleteGenero
};