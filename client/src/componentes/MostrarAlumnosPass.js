import { Header, Titulo, ContenedorHeader } from "../elementos/Header";
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BotonAtras from "../elementos/BotonAtras";

const Tabla = styled.table`
  width: 90%;
  margin: 20px auto;
  border-collapse: collapse;
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const EncabezadoTabla = styled.thead`
  background-color: #5d9cec;
  color: white;
  text-align: left;
`;

const FilaTabla = styled.tr``;

const CeldaEncabezado = styled.th`
  padding: 12px 15px;
`;

const CuerpoTabla = styled.tbody``;

const Celda = styled.td`
  padding: 10px 15px;
  border-bottom: 1px solid #ddd;
  text-align: center;
`;

const ContenedorBusqueda = styled.div`
  width: 90%;
  margin: 20px auto;
  display: flex;
  justify-content: flex-end;
`;

const InputBusqueda = styled.input`
  padding: 10px;
  width: 300px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
`;

const BotonEditar = styled.button`
  padding: 8px 12px;
  background-color: #f0ad4e;
  border: none;
  color: white;
  border-radius: 7px;
  cursor: pointer;
  &:hover {
    background-color: #ec971f;
  }
`;

const MostrarAlumnos = () => {
  const navigate = useNavigate();
  const [alumnos, setAlumnos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const obtenerAlumnos = async () => {
    try {
      const response = await fetch("http://localhost:4000/alumnos");
      const data = await response.json();
      setAlumnos(data);
    } catch (error) {
      console.error("Error al obtener alumnos:", error);
    }
  };

  useEffect(() => {
    obtenerAlumnos();
  }, []);

  const alumnosFiltrados = alumnos.filter((alumno) => {
    const termino = busqueda.toLowerCase();
    return (
      alumno.matricula.toLowerCase().includes(termino) ||
      alumno.nombre.toLowerCase().includes(termino)
    );
  });

  return (
    <>
      <Helmet>
        <title>Mostrar Alumnos</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Listado de Alumnos</Titulo>
        </ContenedorHeader>
      </Header>

      <BotonAtras ruta="/inicio-empleado" />

      <ContenedorBusqueda>
        <InputBusqueda
          type="text"
          placeholder="Buscar por matrícula o nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </ContenedorBusqueda>

      <Tabla>
        <EncabezadoTabla>
          <FilaTabla>
            <CeldaEncabezado>Matrícula</CeldaEncabezado>
            <CeldaEncabezado>Nombre</CeldaEncabezado>
            <CeldaEncabezado>Apellido Paterno</CeldaEncabezado>
            <CeldaEncabezado>Apellido Materno</CeldaEncabezado>
            <CeldaEncabezado>Correo Institucional</CeldaEncabezado>
            <CeldaEncabezado>Observaciones</CeldaEncabezado>
            <CeldaEncabezado>Acciones</CeldaEncabezado>
          </FilaTabla>
        </EncabezadoTabla>

        <CuerpoTabla>
          {alumnosFiltrados.map((alumno) => (
            <FilaTabla key={alumno.matricula}>
              <Celda>{alumno.matricula}</Celda>
              <Celda>{alumno.nombre}</Celda>
              <Celda>{alumno.apellidopaterno}</Celda>
              <Celda>{alumno.apellidomaterno}</Celda>
              <Celda>{alumno.correoinstitucional}</Celda>
              <Celda>{alumno.observaciones}</Celda>
              <Celda>
                <BotonEditar
                  onClick={() => navigate(`/editar-pass/${alumno.matricula}`)}
                >
                  Editar
                </BotonEditar>
              </Celda>
            </FilaTabla>
          ))}
        </CuerpoTabla>
      </Tabla>
    </>
  );
};

export default MostrarAlumnos;
