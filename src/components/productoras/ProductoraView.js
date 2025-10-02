import React, { useState, useEffect } from "react";
import { createProductora, updateProductora, deleteProductora, getProductora } from '../../services/productoraService'
import Swal from "sweetalert2";
const moment = require('moment');

export const ProductoraView = () => {

    const [valoresForm, setValoresForm] = useState({});
    const [productoras, setProductoras] = useState([]);
    const [productoraSelect, setProductoraSelect] = useState(null);
    const { nombre = '', estado = '', slogan = '', descripcion = '' } = valoresForm;

    const listarProductoras = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const res = await getProductora();
            setProductoras(res.data);
            Swal.close();
        } catch (error) {
            console.error(error);
            Swal.close();
        }
    }

    useEffect(() => {
        listarProductoras();
    }, []);

    const handleOnChange = (e) => {
        setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
    }

    const handleCrearProductora = async (e) => {
        if (e) e.preventDefault();
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Guardando...'
            });
            Swal.showLoading();

            if (productoraSelect) {
                await updateProductora(productoraSelect, valoresForm);
                setProductoraSelect(null);
                Swal.close();
                setTimeout(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Productora actualizada correctamente',
                        timer: 2000,
                        showConfirmButton: false
                    });
                }, 200);
            } else {
                await createProductora(valoresForm);
                Swal.close();
                setTimeout(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Productora creada correctamente',
                        timer: 2000,
                        showConfirmButton: false
                    });
                }, 200);
            }

            setValoresForm({ nombre: '', estado: '', slogan: '', descripcion: '' });
            await listarProductoras();
        } catch (error) {
            console.error(error);
            Swal.close();
            setTimeout(() => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al guardar',
                    text: error.response?.data?.msg || error.message || 'Intenta nuevamente'
                });
            }, 200);
        }
    };



    const handleActualizarProductora = async (productora) => {
        setValoresForm({ nombre: productora.nombre, estado: productora.estado, slogan: productora.slogan, descripcion: productora.descripcion });
        setProductoraSelect(productora._id);
    }

    const handleEliminarProductora = async (productora) => {
        const confirmacion = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (confirmacion.isConfirmed) {
            try {
                Swal.fire({ allowOutsideClick: false, text: 'Eliminando productora...' });
                Swal.showLoading();
                await deleteProductora(productora._id);
                await listarProductoras();
                Swal.close();
                Swal.fire({ icon: 'success', title: 'Productora eliminada correctamente', timer: 2000 });
            } catch (error) {
                console.error(error);
                Swal.close();
                Swal.fire({ icon: 'error', title: 'Error al eliminar productora', text: error.message || 'Intenta nuevamente' });
            }
        }
    };

    return (
        <div className="container-fluid">
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="mb-3">
                            <label className="form-label">Nombre de la Productora</label>
                            <input
                                required
                                name='nombre'
                                type='text'
                                className="form-control"
                                onChange={handleOnChange}
                                value={valoresForm.nombre}
                            />
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="mb-3">
                            <label className="form-label">Estado</label>
                            <select
                                required
                                name='estado'
                                className="form-select"
                                onChange={handleOnChange}
                                value={valoresForm.estado}
                            >
                                <option value="">--SELECCIONE--</option>
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="mb-3">
                            <label className="form-label">Slogan</label>
                            <input
                                required
                                name='slogan'
                                type='text'
                                className="form-control"
                                onChange={handleOnChange}
                                value={valoresForm.slogan}
                            />
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="mb-3">
                            <label className="form-label">Descripción</label>
                            <input
                                required
                                name='descripcion'
                                type='text'
                                className="form-control"
                                onChange={handleOnChange}
                                value={valoresForm.descripcion}
                            />
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    className="btn btn-primary mb-3"
                    onClick={handleCrearProductora}
                >
                    Guardar
                </button>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th>Slogan</th>
                            <th>Descripción</th>
                            <th>Fecha Creación</th>
                            <th>Fecha Actualización</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productoras.length > 0 && productoras.map((productora, index) => (
                                <tr key={productora._id || index}>
                                    <th>{index + 1}</th>
                                    <td>{productora.nombre}</td>
                                    <td>{productora.estado}</td>
                                    <td>{productora.slogan}</td>
                                    <td>{productora.descripcion}</td>
                                    <td>{moment(productora.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                                    <td>{moment(productora.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
                                    <td className="d-flex gap-2">
                                        <button
                                            type="button"
                                            className="btn btn-warning"
                                            onClick={() => handleActualizarProductora(productora)}
                                        >
                                            Actualizar
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => handleEliminarProductora(productora)}
                                        >
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </form>
        </div>
    )
}
