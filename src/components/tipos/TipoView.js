import React, { useState, useEffect } from "react";
import { createTipo, updateTipo, deleteTipo, getTipo } from '../../services/tipoService'
import Swal from "sweetalert2";
const moment = require('moment');

export const TipoView = () => {

    const [valoresForm, setValoresForm] = useState({});
    const [tipos, setTipos] = useState([]);
    const [tipoSelect, setTipoSelect] = useState(null);
    const { nombre = '', descripcion = '' } = valoresForm;

    const listarTipos = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });
            Swal.showLoading();
            const res = await getTipo();
            setTipos(res.data);
            Swal.close();
        } catch (error) {
            console.error(error);
            Swal.close();
        }
    }

    useEffect(() => {
        listarTipos();
    }, []);

    const handleOnChange = (e) => {
        setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
    }

    const handleCrearTipo = async (e) => {
        e.preventDefault();
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Guardando...'
            });
            Swal.showLoading();

            if (tipoSelect) {
                await updateTipo(tipoSelect, valoresForm);
                setTipoSelect(null);
                Swal.close();
                setTimeout(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Tipo actualizado correctamente',
                        timer: 2000,
                        showConfirmButton: false
                    });
                }, 200);
            } else {
                await createTipo(valoresForm);
                Swal.close();
                setTimeout(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Tipo creado correctamente',
                        timer: 2000,
                        showConfirmButton: false
                    });
                }, 200);
            }

            setValoresForm({ nombre: '', descripcion: '' });
            await listarTipos();
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


    const handleActualizarTipo = async (tipo) => {
        setValoresForm({ nombre: tipo.nombre, descripcion: tipo.descripcion });
        setTipoSelect(tipo._id);
    }

    const handleEliminarTipo = async (tipo) => {
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
                Swal.fire({ allowOutsideClick: false, text: 'Eliminando tipo...' });
                Swal.showLoading();
                await deleteTipo(tipo._id);
                await listarTipos();
                Swal.close();
                Swal.fire({ icon: 'success', title: 'Tipo eliminado correctamente', timer: 2000 });
            } catch (error) {
                console.error(error);
                Swal.close();
                Swal.fire({ icon: 'error', title: 'Error al eliminar tipo', text: error.message || 'Intenta nuevamente' });
            }
        }
    };

    return (
        <div className="container-fluid">
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
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
                    onClick={handleCrearTipo}
                >
                    Guardar
                </button>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Fecha Creación</th>
                            <th>Fecha Actualización</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tipos.length > 0 && tipos.map((tipo, index) => (
                                <tr key={tipo._id || index}>
                                    <th>{index + 1}</th>
                                    <td>{tipo.nombre}</td>
                                    <td>{tipo.descripcion}</td>
                                    <td>{moment(tipo.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                                    <td>{moment(tipo.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-warning me-2"
                                            onClick={() => handleActualizarTipo(tipo)}
                                        >
                                            Actualizar
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => handleEliminarTipo(tipo)}
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
