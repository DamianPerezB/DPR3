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
  margin-right: 5px;
  &:hover {
    background-color: #ec971f;
  }
`;

const MostrarMateriales = () => {
  const navigate = useNavigate();
  const [materiales, setMateriales] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const obtenerMateriales = async () => {
    try {
      const response = await fetch("http://localhost:4000/materiales");
      const data = await response.json();
      setMateriales(data);
    } catch (error) {
      console.error("Error al obtener materiales:", error);
    }
  };

  useEffect(() => {
    obtenerMateriales();
  }, []);

  const materialesFiltrados = materiales.filter((material) => {
    const termino = busqueda.toLowerCase();
    return (
      material.id.toLowerCase().includes(termino) ||
      material.nombrematerial.toLowerCase().includes(termino)
    );
  });

  return (
    <>
      <Helmet>
        <title>Mostrar Materiales</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Listado de Materiales</Titulo>
        </ContenedorHeader>
      </Header>

      <BotonAtras ruta="/materiales" />

      <ContenedorBusqueda>
        <InputBusqueda
          type="text"
          placeholder="Buscar por ID o nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </ContenedorBusqueda>

      <Tabla>
        <EncabezadoTabla>
          <FilaTabla>
            <CeldaEncabezado>ID</CeldaEncabezado>
            <CeldaEncabezado>Inventario UAM</CeldaEncabezado>
            <CeldaEncabezado>Inventario Coordinación</CeldaEncabezado>
            <CeldaEncabezado>Marca</CeldaEncabezado>
            <CeldaEncabezado>Modelo</CeldaEncabezado>
            <CeldaEncabezado>N° Serie</CeldaEncabezado>
            <CeldaEncabezado>Nombre</CeldaEncabezado>
            <CeldaEncabezado>Cantidad</CeldaEncabezado>
            <CeldaEncabezado>Estado</CeldaEncabezado>
            <CeldaEncabezado>Tipo</CeldaEncabezado>
            <CeldaEncabezado>Acciones</CeldaEncabezado>
          </FilaTabla>
        </EncabezadoTabla>

        <CuerpoTabla>
          {materialesFiltrados.map((material) => (
            <FilaTabla key={material.id}>
              <Celda>{material.id}</Celda>
              <Celda>{material.inventario_uam}</Celda>
              <Celda>{material.inventario_coordinacion}</Celda>
              <Celda>{material.marca}</Celda>
              <Celda>{material.modelo}</Celda>
              <Celda>{material.numeroserie}</Celda>
              <Celda>{material.nombrematerial}</Celda>
              <Celda>{material.cantidad}</Celda>
              <Celda>{material.estado === 0 ? "Disponible" : "Sin Disponibilidad"}</Celda>
              <Celda>{material.tipo === 0 ? "Inventariado" : "Consumible"}</Celda>
              <Celda>
                <BotonEditar onClick={() => navigate(`/editar-material/${material.id}`)}>
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

export default MostrarMateriales;