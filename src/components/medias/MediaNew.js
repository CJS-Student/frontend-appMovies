import React, { useState, useEffect } from "react";
import { getDirector } from '../../services/directorService';
import { getGenero } from '../../services/generoService';
import { getProductora } from '../../services/productoraService';
import { getTipo } from '../../services/tipoService';
import { createMedias } from '../../services/mediaService';
import Swal from "sweetalert2";

export const MediaNew = ({ handleOpenModal, listarMedias }) => {

    const [directores, setDirector] = useState([]);
    const [generos, setGenero] = useState([]);
    const [productoras, setProductora] = useState([]);
    const [tipos, setTipo] = useState([]);
    const [valoresform, setValoresForm] = useState([]);
    const { serial = '', titulo = '', sinopsis = '', url = '', foto = '', anoEstreno = '', genero, director, productora, tipo } = valoresform;


    const listarDirectores = async () => {
        try {

            const { data } = await getDirector();
            setDirector(data);

        } catch (error) {

            console.log(error, 'Error del servidor')

        }
    }

    useEffect(() => {
        listarDirectores();
    }, []);

    const listarGeneros = async () => {
        try {

            const { data } = await getGenero();
            setGenero(data);

        } catch (error) {

            console.log(error, 'Error del servidor')

        }
    }

    useEffect(() => {
        listarGeneros();
    }, []);

    const listarProductoras = async () => {
        try {

            const { data } = await getProductora();
            setProductora(data);

        } catch (error) {

            console.log(error, 'Error del servidor')

        }
    }

    useEffect(() => {
        listarProductoras();
    }, []);

    const listarTipos = async () => {
        try {

            const { data } = await getTipo();
            setTipo(data);

        } catch (error) {

            console.log(error, 'Error del servidor')

        }
    }

    useEffect(() => {
        listarTipos();
    }, []);


    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresform, [name]: value });
    }


    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const data = { serial, titulo, sinopsis, url, foto, anoEstreno, genero, director, productora, tipo };

        console.log('Datos enviados al backend:', data);

        try {

            Swal.fire({ allowOutsideClick: false, text: 'Creando película...' });

            Swal.showLoading();

            const res = await createMedias(data);
            console.log('Respuesta del backend:', res.data);

            Swal.close();

            await Swal.fire({
                icon: 'success',
                title: 'Película creada',
                text: `La película "${res.data.titulo}" se creó correctamente`,
                timer: 2000,
                showConfirmButton: false
            });

            handleOpenModal();
            listarMedias();

        } catch (error) {

            console.error('Error en el POST:', error.response?.data || error.message);
            Swal.close();

            Swal.fire({
                icon: 'error',
                title: 'Error al crear la película',
                text: error.response?.data?.msg || error.message
            });

        }
    }


    /*------------------------ FORMULARIO --------------------*/

    return (
        <div className="sidebar">
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <div className="sidebar-header">
                            <h3>Nueva Pelicula</h3>
                            <i className="fa-solid fa-xmark" onClick={handleOpenModal}></i>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <hr />
                        </div>

                        <form onSubmit={(e) => handleOnSubmit(e)}>
                            <div className="row">
                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label">Serial</label>
                                        <input type="text" name='serial' value={serial} required onChange={(e) => handleOnChange(e)} className="form-control" />
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label">Titulo</label>
                                        <input type="text" name='titulo' value={titulo} required onChange={(e) => handleOnChange(e)} className="form-control" />
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label">Sinopsis</label>
                                        <input type="text" name='sinopsis' value={sinopsis} required onChange={(e) => handleOnChange(e)} className="form-control" />
                                    </div>
                                </div>
                            </div>

                            <div className="row">

                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label">URL</label>
                                        <input type="text" name='url' value={url} required onChange={(e) => handleOnChange(e)} className="form-control" />
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label">Foto</label>
                                        <input type="url" name='foto' value={foto} required onChange={(e) => handleOnChange(e)} className="form-control" />
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label">Fecha de Estreno</label>
                                        <input type="date" name='anoEstreno' value={anoEstreno} required onChange={(e) => handleOnChange(e)} className="form-control" />
                                    </div>
                                </div>
                            </div>

                            <div className="row">

                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label">Genero</label>
                                        <select className="form-select" required
                                            onChange={(e) => handleOnChange(e)} name="genero" value={genero}>
                                            <option value="">--SELECCIONE--</option>
                                            {
                                                generos.map(({ _id, nombre }) => {
                                                    return <option key={_id} value={_id}>{nombre}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label">Director</label>
                                        <select className="form-select" required
                                            onChange={(e) => handleOnChange(e)} name="director" value={director}>
                                            <option>--SELECCIONE--</option>
                                            {
                                                directores.map(({ _id, nombre }) => {
                                                    return <option key={_id} value={_id}>{nombre}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label">Productora</label>
                                        <select className="form-select" required
                                            onChange={(e) => handleOnChange(e)} name="productora" value={productora}>
                                            <option>--SELECCIONE--</option>
                                            {
                                                productoras.map(({ _id, nombre }) => {
                                                    return <option key={_id} value={_id}>{nombre}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className="mb-3">
                                        <label className="form-label">Tipo</label>
                                        <select className="form-select" required
                                            onChange={(e) => handleOnChange(e)} name="tipo" value={tipo}>
                                            <option>--SELECCIONE--</option>
                                            {
                                                tipos.map(({ _id, nombre }) => {
                                                    return <option key={_id} value={_id}>{nombre}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col">
                                    <button className="btn btn-primary">Guardar</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}