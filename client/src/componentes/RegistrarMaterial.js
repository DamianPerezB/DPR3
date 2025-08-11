import React, { useState } from "react";
import { Header, Titulo, ContenedorHeader } from "../elementos/Header";
import Boton from "../elementos/Boton";
import BotonAtras from "../elementos/BotonAtras";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import {
  TitutuloSecciones,
  FormularioRegistroSecciones,
  Select,
  Input2,
  ContenedorBoton,
  FormularioRegistro,
} from "../elementos/ElementosDeFormulario";
import imagen1 from "../imagenes/motasPantera4.png";

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

const RegistrarMaterial = () => {
  const [formData, setFormData] = useState({
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      (name === "numeroSerie" || name === "cantidad") &&
      value &&
      !/^\d+$/.test(value)
    ) {
      return;
    }

    if (name === "cantidad") {
      const cantidadNum = value ? parseInt(value) : 0;
      setFormData((prev) => ({
        ...prev,
        cantidad: value,
        estado: cantidadNum > 0 ? 0 : 1,
      }));
      return;
    }

    if (name === "tipo") {
      if (value === "0") {
        setFormData((prev) => ({
          ...prev,
          tipo: value,
          cantidad: "1",
          estado: 0,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          tipo: value,
        }));
      }
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const campo in formData) {
      if (formData[campo] === "" || formData[campo] === null) {
        alert(`Por favor, completa el campo: ${campo}`);
        return;
      }
    }

    try {
      const response = await fetch("http://localhost:4000/material", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          numeroSerie: formData.numeroSerie
            ? parseInt(formData.numeroSerie)
            : null,
          cantidad: formData.cantidad ? parseInt(formData.cantidad) : null,
          estado: parseInt(formData.estado),
          tipo: parseInt(formData.tipo),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al registrar material");
      }

      alert("Material registrado con éxito");
      setFormData({
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
    } catch (error) {
      console.error("Error al registrar material:", error.message);
      alert(`Hubo un error al registrar el material: ${error.message}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>Registrar Material</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Registro de Material</Titulo>
        </ContenedorHeader>
      </Header>

      <BotonAtras ruta="/materiales" />
      <ImagenMotas src={imagen1} alt="MotasUam" />

      <FormularioRegistro onSubmit={handleSubmit}>
        <FormularioRegistroSecciones>
          <TitutuloSecciones>Datos del Material</TitutuloSecciones>
          Inventario UAM
          <Input2
            type="text"
            name="inventarioUAM"
            value={formData.inventarioUAM}
            onChange={handleChange}
            required
          />
          Inventario Coordinación
          <Input2
            type="text"
            name="inventarioCoordinacion"
            value={formData.inventarioCoordinacion}
            onChange={handleChange}
            required
          />
          Marca
          <Input2
            type="text"
            name="marca"
            value={formData.marca}
            onChange={handleChange}
            required
          />
          Modelo
          <Input2
            type="text"
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
            required
          />
          Número de Serie
          <Input2
            type="text"
            name="numeroSerie"
            value={formData.numeroSerie}
            onChange={handleChange}
            required
          />
          Nombre del Material
          <Input2
            type="text"
            name="nombreMaterial"
            value={formData.nombreMaterial}
            onChange={handleChange}
            required
          />
          Cantidad
          <Input2
            type="text"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            disabled={formData.tipo === "0"}
            required
          />
          Estado
          <Select name="estado" value={formData.estado} disabled>
            <option value="">Seleccione Estado</option>
            <option value="0">Disponible</option>
            <option value="1">Sin Disponibilidad</option>
          </Select>
          Tipo
          <Select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione Tipo</option>
            <option value="0">Inventariado</option>
            <option value="1">Consumible</option>
          </Select>
          Descripción
          <Input2
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </FormularioRegistroSecciones>

        <ContenedorBoton>
          <Boton as="button" type="submit">
            Registrar Material
          </Boton>
        </ContenedorBoton>
      </FormularioRegistro>
    </>
  );
};

export default RegistrarMaterial;
