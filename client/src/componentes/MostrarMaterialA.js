import { Header, Titulo, ContenedorHeader } from "../elementos/Header";
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  TitutuloSecciones,
  FormularioRegistroSecciones,
  Select,
  Input2,
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

const MostrarMaterial = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    id: "",
    inventarioUAM: "",
    inventarioCoordinacion: "",
    marca: "",
    modelo: "",
    numeroSerie: "",
    estado: "",
    nombreMaterial: "",
    cantidad: "",
    tipo: "",
    descripcion: "",
  });

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const response = await fetch(`http://localhost:4000/material/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            id: data.id || "",
            inventarioUAM: data.inventario_uam || "",
            inventarioCoordinacion: data.inventario_coordinacion || "",
            marca: data.marca || "",
            modelo: data.modelo || "",
            numeroSerie: data.numeroserie?.toString() || "",
            estado: data.estado?.toString() || "",
            nombreMaterial: data.nombrematerial || "",
            cantidad: data.cantidad?.toString() || "",
            tipo: data.tipo?.toString() || "",
            descripcion: data.descripcion || "",
          });
        } else {
          alert("Error al obtener datos del material");
        }
      } catch (error) {
        console.error("Error al cargar material:", error);
      }
    };

    if (id) fetchMaterial();
  }, [id]);

  return (
    <>
      <Helmet>
        <title>Ver Material</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Visualización de Material</Titulo>
        </ContenedorHeader>
      </Header>

      <BotonAtras ruta="/mostrar-materiales-a" />
      <ImagenMotas src={imagen1} alt="MotasUam" />

      <FormularioRegistro>
        <FormularioRegistroSecciones>
          <TitutuloSecciones>Datos del Material</TitutuloSecciones>
          ID del Material
          <Input2 type="text" value={formData.id} readOnly />
          Inventario UAM
          <Input2 type="text" value={formData.inventarioUAM} readOnly />
          Inventario Coordinación
          <Input2
            type="text"
            value={formData.inventarioCoordinacion}
            readOnly
          />
          Marca
          <Input2 type="text" value={formData.marca} readOnly />
          Modelo
          <Input2 type="text" value={formData.modelo} readOnly />
          Número de Serie
          <Input2 type="text" value={formData.numeroSerie} readOnly />
          Nombre del Material
          <Input2 type="text" value={formData.nombreMaterial} readOnly />
          Cantidad
          <Input2 type="text" value={formData.cantidad} readOnly />
          Estado
          <Select value={formData.estado} disabled>
            <option value="">Seleccione Estado</option>
            <option value="0">Disponible</option>
            <option value="1">Sin Disponibilidad</option>
          </Select>
          Tipo
          <Select value={formData.tipo} disabled>
            <option value="">Seleccione Tipo</option>
            <option value="0">Inventariado</option>
            <option value="1">Consumible</option>
          </Select>
          Descripción
          <Input2 type="text" value={formData.descripcion} readOnly />
        </FormularioRegistroSecciones>
      </FormularioRegistro>
    </>
  );
};

export default MostrarMaterial;
