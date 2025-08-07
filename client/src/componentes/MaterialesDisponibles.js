import { Header, Titulo, ContenedorHeader } from "../elementos/Header";
import Boton from "../elementos/Boton";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BotonAtras from "../elementos/BotonAtras";
import AnadirMaterial from "../imagenes/AnadirMaterial.png";
import EliminarMaterial from "../imagenes/EliminarMaterial.png";
import BuscarMaterial from "../imagenes/BuscarMaterial.png";
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

const MaterialesDisponibles = () => {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Gestión de Materiales</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Gestión de Materiales</Titulo>
        </ContenedorHeader>
      </Header>
      <BotonAtras ruta="/inicio-empleado" />

      <ContenedorImagen>
        <ImagenLogo1 src={AnadirMaterial} alt="LogoUam" />
        <ImagenLogo1 src={EliminarMaterial} alt="LogoUam" />
      </ContenedorImagen>
      <ContenedorBotonRegistro>
        <Boton
          as="button"
          primario
          type="submit"
          onClick={() => navigate("/registro-material")}
        >
          {" "}
          Añadir Material
        </Boton>
        <Boton
          as="button"
          primario
          type="submit"
          onClick={() => navigate("/eliminar-material")}
        >
          {" "}
          Eliminar Material
        </Boton>
      </ContenedorBotonRegistro>
      <ContenedorImagen>
        <ImagenLogo1 src={BuscarMaterial} alt="LogoUam" />
      </ContenedorImagen>
      <ContenedorBotonRegistro>
        <Boton
          as="button"
          primario
          type="submit"
          onClick={() => navigate("/mostrar-materiales")}
        >
          {" "}
          Mostrar Materiales
        </Boton>
      </ContenedorBotonRegistro>
    </>
  );
};

export default MaterialesDisponibles;
