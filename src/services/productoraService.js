import { axiosConfig } from "../helpers/axios-config";

const getProductora = async () => {
   return axiosConfig.get('productora');
}

const createProductora = (data) => {
    return axiosConfig.post('productora', data);
}

const updateProductora = (productoraId, data) => {
    return axiosConfig.put(`productora/${productoraId}`, data);
}

const deleteProductora = async (productoraId) => {
    return axiosConfig.delete(`productora/${productoraId}`);
}

export {
    getProductora,
    createProductora,
    updateProductora,
    deleteProductora
};