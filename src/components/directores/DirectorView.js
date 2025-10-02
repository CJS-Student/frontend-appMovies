import React, { useState, useEffect } from "react";
import { createDirector, updateDirector, deleteDirector, getDirector } from '../../services/directorService'
import Swal from "sweetalert2";
const moment = require('moment');

export const DirectorView = () => {

    const [valoresForm, setValoresForm] = useState({});
    const [directores, setDirectores] = useState([]);
    const [directorSelect, setDirectorSelect] = useState(null);
    const { nombre = '', estado = '' } = valoresForm;

    const listarDirectores = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'
            });

            Swal.showLoading();
            const res = await getDirector();
            setDirectores(res.data);
            Swal.close();

        } catch (error) {
            console.error(error);
            Swal.close();
        }
    }

    useEffect(() => {
        listarDirectores();
    }, []);

    const handleOnChange = (e) => {
        setValoresForm({ ...valoresForm, [e.target.name]: e.target.value });
    }

    const handleCrearDirector = async (e) => {
    e.preventDefault();

    try {
        Swal.fire({
            allowOutsideClick: false,
            text: 'Guardando...'
        });
        Swal.showLoading();

        if (directorSelect) {
            await updateDirector(directorSelect, valoresForm);
            setDirectorSelect(null);
            setValoresForm({ nombre: '', estado: '' });
            await listarDirectores();

            Swal.close();
            setTimeout(() => {
                Swal.fire({ icon: 'success', title: 'Director actualizado correctamente', timer: 1500, showConfirmButton: false });
            }, 300);

        } else {
            await createDirector(valoresForm);
            setValoresForm({ nombre: '', estado: '' });
            await listarDirectores();

            Swal.close();
            setTimeout(() => {
                Swal.fire({ icon: 'success', title: 'Director creado correctamente', timer: 1500, showConfirmButton: false });
            }, 300);
        }

    } catch (error) {
        console.error(error);
        Swal.close();
        Swal.fire({ icon: 'error', title: 'Error al guardar director', text: error.message || 'Intenta nuevamente' });
    }
}



    const handleActualizarDirector = async (director) => {
        setValoresForm({ nombre: director.nombre, estado: director.estado });
        setDirectorSelect(director._id);
    }

    const handleEliminarDirector = async (director) => {
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
                Swal.fire({ allowOutsideClick: false, text: 'Eliminando director...' });
                Swal.showLoading();

                await deleteDirector(director._id);
                await listarDirectores();
                Swal.close();

                Swal.fire({ icon: 'success', title: 'Director eliminado correctamente', timer: 2000 });
            } catch (error) {
                console.error(error);
                Swal.close();
                Swal.fire({ icon: 'error', title: 'Error al eliminar director', text: error.message || 'Intenta nuevamente' });
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
                            <input required name='nombre' type='text' className="form-control" onChange={handleOnChange} value={valoresForm.nombre} 
                            />
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="mb-3">
                            <label className="form-label">Estado</label>
                            <select required name='estado' className="form-select" onChange={handleOnChange} value={valoresForm.estado}
                            >
                                <option value="">--SELECCIONE--</option>
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                        </div>
                    </div>
                </div>

                <button type="button" className="btn btn-primary mb-3" onClick={handleCrearDirector} >
                    Guardar
                </button>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Estado</th>
                            <th>Fecha Creación</th>
                            <th>Fecha Actualización</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            directores.length > 0 && directores.map((director, index) => (
                                <tr key={director._id || index}>
                                    <th>{index + 1}</th>
                                    <td>{director.nombre}</td>
                                    <td>{director.estado}</td>
                                    <td>{moment(director.fechaCreacion).format('DD-MM-YYYY HH:mm')}</td>
                                    <td>{moment(director.fechaActualizacion).format('DD-MM-YYYY HH:mm')}</td>
                                    <td>
                                        <button type="button" className="btn btn-warning me-2" onClick={() => handleActualizarDirector(director)} >
                                            Actualizar
                                        </button>

                                        <button type="button" className="btn btn-danger" onClick={() => handleEliminarDirector(director)} >
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
