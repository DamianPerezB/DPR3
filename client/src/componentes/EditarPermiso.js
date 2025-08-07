import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  Header,
  Titulo,
  ContenedorHeader,
  Subtitulo,
} from "../elementos/Header";
import Boton from "../elementos/Boton";
import {
  TitutuloSecciones,
  FormularioRegistroSecciones,
  ContenedorBoton,
  FormularioRegistro,
} from "../elementos/ElementosDeFormulario";
import imagen1 from "../imagenes/motasPantera4.png";
import BotonAtras from "../elementos/BotonAtras";

const ImagenMotas = styled.img`
  position: absolute;
  top: 12%;
  left: 76%;
  width: 75% 5%;
  height: 120%;
  z-index: -1;
  @media (max-width: 768px) {
    margin-left: 0;
    width: 24%;
    height: 80%;
    left: 76%;
  }
`;

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

  input[type="checkbox"] {
    transform: scale(1.2);
  }
`;

const EditarPermiso = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [empleado, setEmpleado] = useState({});
  const [permisosDisponibles, setPermisosDisponibles] = useState([]);
  const [permisosSeleccionados, setPermisosSeleccionados] = useState([]);

  useEffect(() => {
    const fetchEmpleado = async () => {
      const res = await fetch(`http://localhost:4000/empleado/${id}`);
      const data = await res.json();
      setEmpleado(data);
    };

    const fetchPermisosDisponibles = async () => {
      const res = await fetch("http://localhost:4000/permisos-empleado");
      const data = await res.json();
      setPermisosDisponibles(data);
    };

    const fetchPermisosAsignados = async () => {
      const res = await fetch(`http://localhost:4000/empleado/${id}/permisos`);
      const data = await res.json();
      setPermisosSeleccionados(data.map((p) => p.idpermiso));
    };

    fetchEmpleado();
    fetchPermisosDisponibles();
    fetchPermisosAsignados();
  }, [id]);

  const handleCheckboxChange = (idPermiso) => {
    setPermisosSeleccionados((prev) =>
      prev.includes(idPermiso)
        ? prev.filter((permiso) => permiso !== idPermiso)
        : [...prev, idPermiso]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:4000/empleado/${id}/permisos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ permisos: permisosSeleccionados }),
      });

      if (res.ok) {
        alert("Permisos actualizados correctamente");
        const usuarioLogueado = localStorage.getItem("idUsuario");
        if (usuarioLogueado && usuarioLogueado === id) {
          localStorage.setItem(
            "permisosUsuario",
            JSON.stringify(permisosSeleccionados)
          );
        }
        navigate("/permisos");
      } else {
        alert("Error al actualizar permisos");
      }
    } catch (error) {
      console.error("Error al actualizar permisos:", error);
      alert("Ocurrió un error al actualizar permisos");
    }
  };

  return (
    <>
      <Helmet>
        <title>Editar permisos</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Editar permisos de empleado</Titulo>
        </ContenedorHeader>
      </Header>

      <BotonAtras ruta="/permisos" />
      <ImagenMotas src={imagen1} alt="MotasUam" />

      <FormularioRegistro onSubmit={handleSubmit}>
        <FormularioRegistroSecciones>
          <TitutuloSecciones>Datos del empleado</TitutuloSecciones>
          <Subtitulo>
            <p>
              <strong>Nombre:</strong> {empleado.nombre}
            </p>
            <p>
              <strong>Apellido Paterno:</strong> {empleado.apellidopaterno}
            </p>
            <p>
              <strong>Apellido Materno:</strong> {empleado.apellidomaterno}
            </p>
            <p>
              <strong>Número económico:</strong> {empleado.noeconomico}
            </p>
          </Subtitulo>
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
                    <input
                      type="checkbox"
                      checked={permisosSeleccionados.includes(permiso.id)}
                      onChange={() => handleCheckboxChange(permiso.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </TablaPermisos>
        </FormularioRegistroSecciones>

        <ContenedorBoton>
          <Boton as="button" type="submit">
            Guardar permisos
          </Boton>
        </ContenedorBoton>
      </FormularioRegistro>
    </>
  );
};

export default EditarPermiso;
