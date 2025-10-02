import React from "react";
import { Link } from 'react-router-dom';

export const MediaCard = (props) => {
    const { media } = props;

    return (
        <div className="col">
            <div className="card">
                <img src={media.foto} className="card-img-top" alt="foto" />
                <div className="card-body">
                    <h5 className="card-title">Caracteristicas</h5>
                    <hr />
                    <p className="card-text">{`Serial: ${media.serial}`}</p>
                    <p className="card-text">{`Titulo: ${media.titulo}`}</p>
                    <p className="card-text">{`Sinopsis: ${media.sinopsis}`}</p>
                    <p className="card-text">{`Año de Estreno: ${media.anoEstreno}`}</p>
                    <p className="card-text">{`Genero: ${media.genero?.nombre}`}</p>
                    <p className="card-text">{`Director: ${media.director?.nombre}`}</p>
                    <p className="card-text">{`Productora: ${media.productora?.nombre}`}</p>
                    <p className="card-text">{`Tipo: ${media.tipo?.nombre}`}</p>
                    <p className="card-text">
                        <Link to={`media/edit/${media._id}`}>Ver más...</Link>
                    </p>
                </div>
            </div>
        </div>

    )
}