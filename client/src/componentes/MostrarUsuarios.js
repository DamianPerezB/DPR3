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
import BotonAtras from "../elementos/BotonAtras";
import UsuarioEmpleado from "../imagenes/UsuarioEmpleado.png";
import UsuarioAlumno from "../imagenes/UsuarioAlumno.png";

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

const MostrarUsuarios = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Mostrar Usuarios</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Visualización de Usuarios</Titulo>
        </ContenedorHeader>
      </Header>

      <BotonAtras ruta="/usuarios" />

      <ContenedorImagen>
        <ImagenLogo1 src={UsuarioAlumno} alt="LogoUam" />
        <ImagenLogo1 src={UsuarioEmpleado} alt="LogoUam" />
      </ContenedorImagen>
      <ContenedorBotonRegistro>
        <Boton
          as="button"
          primario
          type="submit"
          onClick={() => navigate("/mostrar-alumnos")}
        >
          {" "}
          Alumno
        </Boton>
        <Boton
          as="button"
          primario
          type="submit"
          onClick={() => navigate("/mostrar-empleados")}
        >
          Administrativo
        </Boton>
      </ContenedorBotonRegistro>
    </>
  );
};

export default MostrarUsuarios;
