import {
  Header,
  Titulo,
  ContenedorHeader,
  Subtitulo,
} from "../elementos/Header";
import Boton from "../elementos/Boton";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import pantera1 from "../imagenes/Pantera1.png";
import BotonAtras from "../elementos/BotonAtras";
import PrestamosAutorizados from "../imagenes/PrestamosAutorizados.png";
const ImagenLogo1 = styled.img`
  margin-right: 2%;
  width: 35%; /* La imagen es un 30% más pequeña */
  @media (max-width: 768px) {
    margin-top: -400px;
    width: 40%; /* Ocupa todo el ancho del contenedor en pantallas pequeñas */
  }
`;

const ContenedorImagen = styled.div`
  height: 100%;
  width: 100%;
  margin-left: 13%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ContenedorBotonRegistro = styled.div`
  display: flex;
  justify-content: center;
  margin: 1% 0; /* 40px */
  gap: 300px; /* Espacio entre los botones */
`;

const Historico = () => {
  return (
    <>
      <Helmet>
        <title>Historico</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Historico y Adeudos</Titulo>
        </ContenedorHeader>
      </Header>
      <BotonAtras ruta="/inicio-empleado" />

      <ContenedorImagen>
        <ImagenLogo1 src={PrestamosAutorizados} alt="LogoUam" />
      </ContenedorImagen>
      <ContenedorBotonRegistro>
        <Boton
          as="button"
          primario
          type="submit"
          style={{ marginLeft: "-37%" }}
        >
          Prestamos Autorizados
        </Boton>
      </ContenedorBotonRegistro>
    </>
  );
};

export default Historico;
