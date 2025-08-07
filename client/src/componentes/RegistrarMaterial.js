import { Header, Titulo, ContenedorHeader } from "../elementos/Header";
import Boton from "../elementos/Boton";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
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

const RegistrarMaterial = () => {
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      (name === "numeroSerie" || name === "cantidad") &&
      value &&
      !/^\d+$/.test(value)
    ) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const campo in formData) {
      if (formData[campo].trim() === "") {
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
          numeroSerie: parseInt(formData.numeroSerie),
          cantidad: parseInt(formData.cantidad),
          estado: parseInt(formData.estado),
          tipo: parseInt(formData.tipo),
        }),
      });

      if (!response.ok) throw new Error("Error al registrar material");

      const data = await response.json();
      alert("Material registrado con éxito");
      navigate("/materiales");
    } catch (error) {
      console.error("Error al registrar material:", error);
      alert("Hubo un error al registrar el material");
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
          ID del Material
          <Input2
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="ID único del material"
            required
          />
          Inventario UAM
          <Input2
            type="text"
            name="inventarioUAM"
            value={formData.inventarioUAM}
            onChange={handleChange}
            placeholder="Inventario UAM"
            required
          />
          Inventario Coordinación
          <Input2
            type="text"
            name="inventarioCoordinacion"
            value={formData.inventarioCoordinacion}
            onChange={handleChange}
            placeholder="Inventario Coordinación"
            required
          />
          Marca
          <Input2
            type="text"
            name="marca"
            value={formData.marca}
            onChange={handleChange}
            placeholder="Marca"
            required
          />
          Modelo
          <Input2
            type="text"
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
            placeholder="Modelo"
            required
          />
          Número de Serie
          <Input2
            type="text"
            name="numeroSerie"
            value={formData.numeroSerie}
            onChange={handleChange}
            placeholder="Ej: 1234567890"
            required
          />
          Nombre del Material
          <Input2
            type="text"
            name="nombreMaterial"
            value={formData.nombreMaterial}
            onChange={handleChange}
            placeholder="Ej: Laptop Dell"
            required
          />
          Cantidad
          <Input2
            type="text"
            name="cantidad"
            value={formData.cantidad}
            onChange={handleChange}
            placeholder="Ej: 10"
            required
          />
          Estado
          <Select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            required
          >
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
            placeholder="Breve descripción del material"
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
