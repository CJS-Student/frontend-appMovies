import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getDirector } from '../../services/directorService';
import { getGenero } from '../../services/generoService';
import { getProductora } from '../../services/productoraService';
import { getTipo } from '../../services/tipoService';
import { createMedias, getMediaPorId, updateMedias } from '../../services/mediaService';
import { useHistory } from 'react-router-dom';
import Swal from "sweetalert2";

export const MediaEdit = () => {

    const { mediaId = '' } = useParams();

    const [media, setMedia] = useState([]);
    const [directores, setDirector] = useState([]);
    const [generos, setGenero] = useState([]);
    const [productoras, setProductora] = useState([]);
    const [tipos, setTipo] = useState([]);
    const [valoresform, setValoresForm] = useState({});
    const { serial = '', titulo = '', sinopsis = '', url = '', foto = '', anoEstreno = '', genero, director, productora, tipo } = valoresform;

    const history = useHistory();

    const listarDirectores = async () => {

        try {

            const { data } = await getDirector();
            console.log("Media creada:", data);
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


    const getMedia = async () => {

        try {
            const { data } = await getMediaPorId(mediaId);

            console.log(data);
            setMedia(data);

            Swal.close();
        } catch (error) {

            console.error('Error al obtener media:', error.response?.data || error.message);
            Swal.close();
        }
    };

    useEffect(() => {
        getMedia();
    }, [mediaId]);

    useEffect(() => {
        if (media) {
            setValoresForm({
                serial: media.serial,
                titulo: media.titulo,
                sinopsis: media.sinopsis,
                url: media.url,
                foto: media.foto,
                anoEstreno: media.anoEstreno,
                genero: media.genero,
                director: media.director,
                productora: media.productora,
                tipo: media.tipo,
            });
        }
    }, [media]);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresform, [name]: value });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const media = {
            serial, titulo, sinopsis, url, foto, anoEstreno,
            genero: {
                _id: genero
            },
            director: {
                _id: director
            },
            productora: {
                _id: productora
            },
            tipo: {
                _id: tipo,
            }
        }
        console.log(media)

        try {

            Swal.fire({
                allowOutsideClick: false,
                text: 'Cargando...'

            });

            Swal.showLoading();

            const { data } = await updateMedias(mediaId, media);

            Swal.close();

            Swal.fire({
                icon: 'success',
                title: 'Película actualizada correctamente',
                timer: 1500,
                showConfirmButton: false
            }).then(() => {
                history.push('/');
            });

        } catch (error) {

            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.msg || error.message
            });
            console.error('Error al actualizar película:', error);
        }
    };

    /*------------------------ FORMULARIO --------------------*/

    return (

        <div className="container-fluid mt-3 mb-3">
            <div className="card card-edit">
                <div className="card-header">
                    <h5 className="card-title card-edit-title">DETALLES:</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <img src={media?.foto} alt="Foto" />
                        </div>
                        <div className="col-md-8">
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
                                            <img src={media?.foto} alt="Foto" />
                                            <input type="text" name='foto' value={foto} required onChange={(e) => handleOnChange(e)} className="form-control" />
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
                                            <select className="form-select" name="genero" value={genero} onChange={handleOnChange}>
                                                <option value="">--SELECCIONE--</option>
                                                {generos.map(({ _id, nombre }) => (
                                                    <option key={_id} value={_id}>{nombre}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="form-label">Director</label>
                                            <select className="form-select" name="director" value={director} onChange={handleOnChange}>
                                                <option value="">--SELECCIONE--</option>
                                                {directores.map(({ _id, nombre }) => (
                                                    <option key={_id} value={_id}>{nombre}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="form-label">Productora</label>
                                            <select className="form-select" name="productora" value={productora} onChange={handleOnChange}>
                                                <option value="">--SELECCIONE--</option>
                                                {productoras.map(({ _id, nombre }) => (
                                                    <option key={_id} value={_id}>{nombre}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="form-label">Tipo</label>
                                            <select className="form-select" name="tipo" value={tipo} onChange={handleOnChange}>
                                                <option value="">--SELECCIONE--</option>
                                                {tipos.map(({ _id, nombre }) => (
                                                    <option key={_id} value={_id}>{nombre}</option>
                                                ))}
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
        </div>
    )
}