import React, { useState } from "react";
import { Header, Titulo, ContenedorHeader } from "../elementos/Header";
import Boton from "../elementos/Boton";
import { Helmet } from "react-helmet";
import {
  Formulario,
  Input,
  ContenedorBoton,
} from "../elementos/ElementosDeFormulario";
import styled from "styled-components";
import imagen from "../imagenes/variacion5Cua.png";
import { useNavigate } from "react-router-dom";

const ImagenLogo1 = styled.img`
  width: 40%;
  margin-left: -2%;
  margin-top: 20px;
  @media (max-width: 768px) {
    margin-left: 0;
    width: 92%;
  }
`;

const ContenedorTitulo = styled.div`
  height: 10%;
  width: 50%;
  margin: 1%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 40%;
`;

const InicioSesion = () => {
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("idUsuario", data.datos.id);
        localStorage.setItem("tipoUsuario", data.tipo);

        if (data.tipo === "empleado") {
          try {
            const permisosRes = await fetch(
              `http://localhost:4000/empleado/${data.datos.id}/permisos`
            );
            const permisosData = await permisosRes.json();

            if (permisosRes.ok) {
              const idsPermisos = permisosData.map(
                (permiso) => permiso.idpermiso
              );
              localStorage.setItem(
                "permisosUsuario",
                JSON.stringify(idsPermisos)
              );
            } else {
              console.warn("No se pudieron cargar los permisos del usuario");
              localStorage.setItem("permisosUsuario", "[]");
            }
          } catch (permisoError) {
            console.error("Error al obtener permisos", permisoError);
            localStorage.setItem("permisosUsuario", "[]");
          }

          navigate("/inicio-empleado");
        } else if (data.tipo === "alumno") {
          navigate("/inicio-alumno");
        }
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error al iniciar sesión", error);
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <>
      <Helmet>
        <title>Inicia Sesión</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Iniciar Sesión</Titulo>
        </ContenedorHeader>
      </Header>

      <ContenedorTitulo>
        <ImagenLogo1 src={imagen} alt="LogoUam" />
      </ContenedorTitulo>

      <Formulario onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Correo Electrónico Institucional"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <ContenedorBoton>
          <Boton as="button" primario type="submit">
            Iniciar Sesión
          </Boton>
        </ContenedorBoton>

        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </Formulario>
    </>
  );
};

export default InicioSesion;
