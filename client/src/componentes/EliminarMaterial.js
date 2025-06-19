import { Header, Titulo, ContenedorHeader } from "../elementos/Header";
import Boton from "../elementos/Boton";
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

const BotonEliminar = styled.button`
  padding: 8px 12px;
  background-color: #d9534f;
  border: none;
  color: white;
  border-radius: 7px;
  cursor: pointer;
  &:hover {
    background-color: #c9302c;
  }
`;

const EliminarMaterial = () => {
  const [materiales, setMateriales] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  const obtenerMateriales = async () => {
    try {
      const response = await fetch("http://localhost:4000/materiales");
      const data = await response.json();
      setMateriales(data);
    } catch (error) {
      console.error("Error al obtener materiales:", error);
    }
  };

  const handleEliminar = async (id) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este material?");
    if (!confirmar) return;

    try {
      const response = await fetch(`http://localhost:4000/material/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMateriales((prev) => prev.filter((m) => m.id !== id));
        alert("Material eliminado correctamente.");
      } else {
        alert("No se pudo eliminar el material.");
      }
    } catch (error) {
      console.error("Error al eliminar material:", error);
      alert("Hubo un error al intentar eliminar el material.");
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
        <title>Eliminar Material</title>
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
          placeholder="Buscar por ID o nombre del material..."
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
            <CeldaEncabezado>Número de Serie</CeldaEncabezado>
            <CeldaEncabezado>Nombre</CeldaEncabezado>
            <CeldaEncabezado>Cantidad</CeldaEncabezado>
            <CeldaEncabezado>Estado</CeldaEncabezado>
            <CeldaEncabezado>Tipo</CeldaEncabezado>
            <CeldaEncabezado>Descripción</CeldaEncabezado>
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
              <Celda>{material.estado === 0 ? "Disponible" : "No disponible"}</Celda>
              <Celda>{material.tipo === 0 ? "Inventariado" : "Consumible"}</Celda>
              <Celda>{material.descripcion}</Celda>
              <Celda>
                <BotonEliminar onClick={() => handleEliminar(material.id)}>
                  Eliminar
                </BotonEliminar>
              </Celda>
            </FilaTabla>
          ))}
        </CuerpoTabla>
      </Tabla>
    </>
  );
};

export default EliminarMaterial;