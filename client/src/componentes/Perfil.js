import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Header, Titulo, ContenedorHeader } from "../elementos/Header";
import Boton from "../elementos/Boton";
import {
  TitutuloSecciones,
  FormularioRegistroSecciones,
  Input2,
  ContenedorBoton,
  FormularioRegistro,
} from "../elementos/ElementosDeFormulario";
import imagen1 from "../imagenes/motasPantera4.png";

const ImagenMotas = styled.img`
  position: absolute;
  top: 12%;
  left: 76%;
  width: 24%;
  height: 80%;
  z-index: -1;
  @media (max-width: 768px) {
    margin-left: 0;
    width: 24%;
    height: 80%;
    left: 76%;
  }
`;

// Tabla de permisos
const TablaPermisos = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th,
  td {
    padding: 0.6rem 0.8rem;
    text-align: left;
    border-bottom: 1px solid #ccc;
  }

  th {
    background-color: #f5f5f5;
  }

  tr:hover {
    background-color: #f9f9f9;
  }
`;

const Perfil = () => {
  const navigate = useNavigate();
  const [empleado, setEmpleado] = useState(null);
  const [permisosDisponibles, setPermisosDisponibles] = useState([]);
  const [permisosAsignados, setPermisosAsignados] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem("idUsuario");
    const tipo = localStorage.getItem("tipoUsuario");

    if (!id || tipo !== "empleado") {
      navigate("/");
    }

    fetch(`http://localhost:4000/empleado/${id}`)
      .then((response) => response.json())
      .then((data) => setEmpleado(data))
      .catch((error) => console.error("Error al obtener empleado:", error));

    fetch("http://localhost:4000/permisos-empleado")
      .then((response) => response.json())
      .then((data) => setPermisosDisponibles(data))
      .catch((error) =>
        console.error("Error al obtener permisos disponibles:", error)
      );

    const permisosGuardados = localStorage.getItem("permisosUsuario");
    if (permisosGuardados) {
      try {
        const ids = JSON.parse(permisosGuardados).map((id) => Number(id));
        setPermisosAsignados(ids);
      } catch (error) {
        console.error("Error al parsear permisosUsuario:", error);
      }
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Perfil</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Perfil</Titulo>
        </ContenedorHeader>
      </Header>

      <ImagenMotas src={imagen1} alt="MotasUam" />

      <FormularioRegistro>
        <FormularioRegistroSecciones>
          <TitutuloSecciones>Datos del Empleado</TitutuloSecciones>

          {empleado ? (
            <>
              Nombre completo:
              <Input2
                value={`${empleado.nombre} ${empleado.apellidopaterno} ${empleado.apellidomaterno}`}
                disabled
              />
              No. Económico:
              <Input2 value={empleado.noeconomico} disabled />
              Correo institucional:
              <Input2 value={empleado.correoinstitucional} disabled />
              Estado:
              <Input2 value={empleado.estado_nombre} disabled />
              Tipo:
              <Input2 value={empleado.tipo_nombre} disabled />
            </>
          ) : (
            <p>Cargando datos del empleado...</p>
          )}
        </FormularioRegistroSecciones>

        <FormularioRegistroSecciones>
          <TitutuloSecciones>Permisos asignados</TitutuloSecciones>

          <TablaPermisos>
            <thead>
              <tr>
                <th>Permiso</th>
                <th>Asignado</th>
              </tr>
            </thead>
            <tbody>
              {permisosDisponibles.map((permiso) => (
                <tr key={permiso.id}>
                  <td>{permiso.nombre}</td>
                  <td>
                    {permisosAsignados.includes(permiso.id) ? "Sí" : "No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </TablaPermisos>
        </FormularioRegistroSecciones>

        <ContenedorBoton>
          <Boton
            as="button"
            primario
            type="button"
            onClick={() => navigate("/inicio-empleado")}
          >
            Regresar al Menú
          </Boton>
        </ContenedorBoton>
      </FormularioRegistro>
    </>
  );
};

export default Perfil;
