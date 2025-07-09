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
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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
  margin-right: 5px;
  &:hover {
    background-color: #ec971f;
  }
`;

const MostrarEmpleados = () => {
  const navigate = useNavigate();
  const [empleados, setEmpleados] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const obtenerEmpleados = async () => {
    try {
      const response = await fetch("http://localhost:4000/empleados");
      const data = await response.json();
      setEmpleados(data);
    } catch (error) {
      console.error("Error al obtener empleados:", error);
    }
  };

  useEffect(() => {
    obtenerEmpleados();
  }, []);

  const empleadosFiltrados = empleados.filter((empleado) => {
    const termino = busqueda.toLowerCase();
    return (
      empleado.noeconomico.toString().includes(termino) ||
      empleado.nombre.toLowerCase().includes(termino)
    );
  });

  return (
    <>
      <Helmet>
        <title>Mostrar Empleados</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Listado de Empleados</Titulo>
        </ContenedorHeader>
      </Header>

      <BotonAtras ruta="/mostrar-usuarios" />

      <ContenedorBusqueda>
        <InputBusqueda
          type="text"
          placeholder="Buscar por número económico o nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </ContenedorBusqueda>

      <Tabla>
        <EncabezadoTabla>
          <FilaTabla>
            <CeldaEncabezado>Número Económico</CeldaEncabezado>
            <CeldaEncabezado>Nombre</CeldaEncabezado>
            <CeldaEncabezado>Apellido Paterno</CeldaEncabezado>
            <CeldaEncabezado>Apellido Materno</CeldaEncabezado>
            <CeldaEncabezado>Correo Institucional</CeldaEncabezado>
            <CeldaEncabezado>Estado</CeldaEncabezado>
            <CeldaEncabezado>Tipo</CeldaEncabezado>
            <CeldaEncabezado>Acciones</CeldaEncabezado>
          </FilaTabla>
        </EncabezadoTabla>

        <CuerpoTabla>
          {empleadosFiltrados.map((empleado) => (
            <FilaTabla key={empleado.noeconomico}>
              <Celda>{empleado.noeconomico}</Celda>
              <Celda>{empleado.nombre}</Celda>
              <Celda>{empleado.apellidopaterno}</Celda>
              <Celda>{empleado.apellidomaterno}</Celda>
              <Celda>{empleado.correoinstitucional}</Celda>
              <Celda>{empleado.estado_nombre}</Celda>
              <Celda>{empleado.tipo_nombre}</Celda>
              <Celda>
                <BotonEditar
                  onClick={() =>
                    navigate(`/editar-empleado/${empleado.noeconomico}`)
                  }
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

export default MostrarEmpleados;
