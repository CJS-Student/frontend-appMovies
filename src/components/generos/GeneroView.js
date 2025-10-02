import React, { useState, useEffect } from "react";
import { createGenero, updateGenero, deleteGenero, getGenero } from '../../services/generoService'
import Swal from "sweetalert2";
const moment = require('moment');

export const GeneroView = () => {
    const [valoresForm, setValoresForm] = useState({});
    const [generos, setGeneros] = useState([]);
    const [GeneroSelect, setGeneroSelect] = useState(null);
    const { nombre = '', estado = '', descripcion = '' } = valoresForm;

    const listarGeneros = async () => {
        try {
            Swal.fire({ allowOutsideClick: false, text: 'Cargando...' });
            Swal.showLoading();
            const res = await getGenero();
            setGeneros(res.data);
            Swal.close();
        } catch (error) {
            console.error(error);
            Swal.close();
        }
    }

    useEffect(() => {
        listarGeneros();
    }, []);

    const handleOnChange = (e) => {
        setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
    }

    const handleCrearGenero = async (e) => {
        e.preventDefault();
        try {
            Swal.fire({ allowOutsideClick: false, text: 'Cargando...' });
            Swal.showLoading();
            if (GeneroSelect) {
                await updateGenero(GeneroSelect, valoresForm);
                setGeneroSelect(null);
            } else {
                await createGenero(valoresForm);
            }
            setValoresForm({ nombre: '', estado: '', descripcion: '' });
            await listarGeneros();
            Swal.close();
            Swal.fire({ icon: 'success', title: 'Operación exitosa', timer: 1500 });
        } catch (error) {
            console.error(error);
            Swal.close();
            Swal.fire({ icon: 'error', title: 'Error', text: error.message || 'Intenta nuevamente' });
        }
    }

    const handleActualizarGenero = (e, genero) => {
        e.preventDefault();
        setValoresForm({ nombre: genero.nombre, estado: genero.estado, descripcion: genero.descripcion });
        setGeneroSelect(genero._id);
    }

    const handleGuardarEdicion = async () => {
        if (!GeneroSelect) return;
        try {
            Swal.fire({ allowOutsideClick: false, text: 'Actualizando...' });
            Swal.showLoading();
            await updateGenero(GeneroSelect, valoresForm);
            setValoresForm({ nombre: '', estado: '', descripcion: '' });
            setGeneroSelect(null);
            await listarGeneros();
            Swal.close();
            Swal.fire({ icon: 'success', title: 'Género actualizado correctamente', timer: 1500, showConfirmButton: false });
        } catch (error) {
            Swal.close();
            Swal.fire({ icon: 'error', title: 'Error al actualizar', text: error.response?.data?.msg || error.message });
        }
    }

    const handleEliminarGenero = async (genero) => {
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
                Swal.fire({ allowOutsideClick: false, text: 'Eliminando...' });
                Swal.showLoading();
                await deleteGenero(genero._id);
                await listarGeneros();
                Swal.close();
                Swal.fire({ icon: 'success', title: 'Género eliminado correctamente', timer: 1500, showConfirmButton: false });
            } catch (error) {
                Swal.close();
                Swal.fire({ icon: 'error', title: 'Error al eliminar', text: error.message || 'Intenta nuevamente' });
            }
        }
    };

    return (
        <div className="container-fluid">
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input required name='nombre' type='text' className="form-control" onChange={handleOnChange} value={nombre} />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="mb-3">
                            <label className="form-label">Estado</label>
                            <select required name='estado' className="form-select" onChange={handleOnChange} value={estado} >
                                <option value="">--SELECCIONE--</option>
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="mb-3">
                            <label className="form-label">Descripción</label>
                            <input required name='descripcion' type='text' className="form-control" onChange={handleOnChange} value={descripcion} />
                        </div>
                    </div>
                </div>
                <button type="button" className="btn btn-primary me-2 ms-2" onClick={handleCrearGenero}>Guardar</button>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="row">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Fecha Creación</th>
                            <th scope="col">Fecha Actualización</th>
                            <th scope="col">Descripcion</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {generos.length > 0 && generos.map((genero, index) => (
                            <tr key={genero._id || index}>
                                <th scope='row'>{index + 1}</th>
                                <td>{genero.nombre}</td>
                                <td>{genero.estado}</td>
                                <td>{moment(genero.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                                <td>{moment(genero.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
                                <td>{genero.descripcion}</td>
                                <td>
                                    <button type="button" className="btn btn-warning ms-2 me-2" onClick={(e) => handleActualizarGenero(e, genero)}>Actualizar</button>
                                    <button type="button" className="btn btn-danger btn-sn" onClick={() => handleEliminarGenero(genero)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </form>
        </div>
    )
}
