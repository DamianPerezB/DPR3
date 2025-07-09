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

const RegistrarEmpleado = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    noEconomico: "",
    password: "",
    repeatPassword: "",
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    correoInstitucional: "",
    estado: "0",
    tipo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "noEconomico" && !/^[0-9]*$/.test(value)) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.repeatPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    if (!formData.correoInstitucional.endsWith("@cua.uam.mx")) {
      alert("El correo debe terminar en @cua.uam.mx");
      return;
    }

    if (formData.noEconomico.length !== 5) {
      alert("El número económico no es válido.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/empleado", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log("Empleado registrado:", data);
      alert("Empleado registrado con éxito");
      navigate("/registro-usuarios");
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Error al registrar al Empleado");
    }
  };

  return (
    <>
      <Helmet>
        <title>Registrar Empleado</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Registro de Empleado</Titulo>
        </ContenedorHeader>
      </Header>
      <ImagenMotas src={imagen1} alt="MotasUam" />
      <BotonAtras ruta="/registro-usuarios" />

      <FormularioRegistro onSubmit={handleSubmit}>
        <FormularioRegistroSecciones>
          <TitutuloSecciones>Datos de Contacto</TitutuloSecciones>
          Nombre(s)
          <Input2
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre(s)"
            required
          />
          <Input2
            type="text"
            name="apellidoPaterno"
            value={formData.apellidoPaterno}
            onChange={handleChange}
            required
            placeholder="Apellido Paterno"
          />
          <Input2
            type="text"
            name="apellidoMaterno"
            value={formData.apellidoMaterno}
            onChange={handleChange}
            required
            placeholder="Apellido Materno"
          />
        </FormularioRegistroSecciones>

        <FormularioRegistroSecciones>
          <TitutuloSecciones>Datos de la Cuenta</TitutuloSecciones>
          <Input2
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña"
            required
          />
          <Input2
            type="password"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleChange}
            placeholder="Repetir Contraseña"
            required
          />
        </FormularioRegistroSecciones>

        <FormularioRegistroSecciones>
          <TitutuloSecciones>Datos del Empleado</TitutuloSecciones>
          No. Economico
          <Input2
            type="text"
            name="noEconomico"
            value={formData.noEconomico}
            onChange={handleChange}
            placeholder="Número económico"
            required
          />
          Tipo de Cargo
          <Select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione su cargo</option>
            <option value="0">Coordinador</option>
            <option value="1">Técnico</option>
            <option value="2">Profesor</option>
          </Select>
          Correo Institucional
          <Input2
            type="email"
            name="correoInstitucional"
            value={formData.correoInstitucional}
            onChange={handleChange}
            placeholder="Correo Institucional"
            required
          />
        </FormularioRegistroSecciones>

        <ContenedorBoton>
          <Boton as="button" type="submit">
            Registrar Empleado
          </Boton>
        </ContenedorBoton>
      </FormularioRegistro>
    </>
  );
};

export default RegistrarEmpleado;
