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
  position: absolute; /* Coloca el contenedor en la posición absoluta */
  top: 12%; /* Alínea la imagen al borde superior */
  left: 76%; /* Alínea la imagen al borde izquierdo */
  width: 75% 5%; /* Ocupa todo el ancho de la pantalla */
  height: 120%; /* Ocupa todo el alto de la pantalla */

  z-index: -1; /* Envía la imagen detrás del formulario */
  @media (max-width: 768px) {
    margin-left: 0; /* Elimina el margen izquierdo en pantallas pequeñas */
    width: 24%; /* Ocupa todo el ancho del contenedor en pantallas pequeñas */
    height: 80%;
    left: 76%; /* Alínea la imagen al borde izquierdo */
  }
`;
const RegistrarEmpleado = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    noEconomico: "",
    password: "",
    nombre: "",
    apellidop: "",
    apellidom: "",
    correoInstitucional: "",
    estado: "0",
    tipo: "",
    permisos: "",
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
      alert("El número economico no es valido.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/empleado", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData }),
      });

      const data = await response.json();
      console.log("Empleado registrado:", data);
      alert("Empleado registrado con éxito");
      navigate("/usuarios");
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
            name="apellidop"
            value={formData.apellidop}
            onChange={handleChange}
            placeholder="apellidop"
            required
          />
          <Input2
            type="text"
            name="apellidom"
            value={formData.apellidom}
            onChange={handleChange}
            placeholder="apellidom"
            required
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
            placeholder="noEconomico"
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
            <option value="1">Tecnico</option>
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

        <FormularioRegistroSecciones>
          <Select
            name="permisos"
            value={formData.permisos}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione el tipo de Permiso</option>
            <option value="0">Gestor de materiales</option>
            <option value="1">Gestor de reportes</option>
            <option value="2">Gestor de avisos</option>
            <option value="3">Gestor de permisos</option>
            <option value="4">Gestor de adeudos</option>
            <option value="5">Gestor de usuarios</option>
          </Select>
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
