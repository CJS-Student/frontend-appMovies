import { axiosConfig } from "../helpers/axios-config";

const getTipo = async () => {
   return axiosConfig.get('tipo');
}

const createTipo = (data) => {
    return axiosConfig.post('tipo', data);
}

const updateTipo = (tipoId, data) => {
    return axiosConfig.put(`tipo/${tipoId}`, data);
}

const deleteTipo = async (tipoId) => {
    return axiosConfig.delete(`tipo/${tipoId}`);
}

export {
    getTipo,
    createTipo,
    updateTipo,
    deleteTipo
};