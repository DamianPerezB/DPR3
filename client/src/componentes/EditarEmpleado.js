import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import { Select } from "../elementos/ElementosDeFormulario";
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

const EditarEmpleado = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    noEconomico: "",
    password: "",
    repeatPassword: "",
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    correoInstitucional: "",
    estado: "",
    tipo: "",
  });

  const [tiposEmpleado, setTiposEmpleado] = useState([]);
  const [estadosEmpleado, setEstadosEmpleado] = useState([]);

  useEffect(() => {
    const fetchEmpleado = async () => {
      try {
        const response = await fetch(`http://localhost:4000/empleado/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            noEconomico: data.noeconomico || "",
            password: "",
            repeatPassword: "",
            nombre: data.nombre || "",
            apellidoPaterno: data.apellidopaterno || "",
            apellidoMaterno: data.apellidomaterno || "",
            correoInstitucional: data.correoinstitucional || "",
            estado: data.estado !== null ? String(data.estado) : "",
            tipo: data.tipo !== null ? String(data.tipo) : "",
          });
        }
      } catch (error) {
        console.error("Error al cargar empleado:", error);
      }
    };

    const fetchTipos = async () => {
      const res = await fetch("http://localhost:4000/tipos-empleado");
      const data = await res.json();
      setTiposEmpleado(data);
    };

    const fetchEstados = async () => {
      const res = await fetch("http://localhost:4000/estados-empleado");
      const data = await res.json();
      setEstadosEmpleado(data);
    };

    if (id) {
      fetchEmpleado();
      fetchTipos();
      fetchEstados();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "noEconomico" && value !== "" && !/^\d+$/.test(value)) return;
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

    try {
      const empleadoData = {
        noEconomico: formData.noEconomico,
        nombre: formData.nombre,
        apellidoPaterno: formData.apellidoPaterno,
        apellidoMaterno: formData.apellidoMaterno,
        correoInstitucional: formData.correoInstitucional,
        estado: parseInt(formData.estado),
        tipo: parseInt(formData.tipo),
      };

      if (formData.password) {
        empleadoData.password = formData.password;
      }

      const response = await fetch(`http://localhost:4000/empleado/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(empleadoData),
      });

      if (response.ok) {
        alert("Datos del empleado actualizados con éxito");
        navigate("/mostrar-empleados");
      } else {
        const errorData = await response.json();
        console.error("Error al actualizar:", errorData);
        alert("Error al actualizar empleado");
      }
    } catch (error) {
      console.error("Error al enviar solicitud PUT:", error);
      alert("Ocurrió un error al actualizar empleado");
    }
  };

  return (
    <>
      <Helmet>
        <title>Edición de empleado</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Edición de empleado</Titulo>
        </ContenedorHeader>
      </Header>

      <BotonAtras ruta="/mostrar-empleados" />
      <ImagenMotas src={imagen1} alt="MotasUam" />

      <FormularioRegistro onSubmit={handleSubmit}>
        <FormularioRegistroSecciones>
          <TitutuloSecciones>Datos de Contacto</TitutuloSecciones>
          <Subtitulo>
            Nombre
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
              placeholder="Apellido Paterno"
              required
            />
            <Input2
              type="text"
              name="apellidoMaterno"
              value={formData.apellidoMaterno}
              onChange={handleChange}
              placeholder="Apellido Materno"
              required
            />
          </Subtitulo>
        </FormularioRegistroSecciones>

        <FormularioRegistroSecciones>
          <TitutuloSecciones>Datos de la Cuenta</TitutuloSecciones>
          <Input2
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña (dejar en blanco para no cambiar)"
          />
          <Input2
            type="password"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleChange}
            placeholder="Repetir Contraseña"
          />
        </FormularioRegistroSecciones>

        <FormularioRegistroSecciones>
          <TitutuloSecciones>Datos del Empleado</TitutuloSecciones>
          <Input2
            type="text"
            name="noEconomico"
            value={formData.noEconomico}
            onChange={handleChange}
            placeholder="No Económico"
            required
          />
          <Input2
            type="email"
            name="correoInstitucional"
            value={formData.correoInstitucional}
            onChange={handleChange}
            placeholder="Correo Institucional"
            required
          />

          <label>Estado:</label>
          <Select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione estado</option>
            {estadosEmpleado.map((estado) => (
              <option key={estado.id} value={estado.id}>
                {estado.nombre}
              </option>
            ))}
          </Select>

          <label>Tipo:</label>
          <Select
            name="tipo"
            value={formData.tipo}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione tipo</option>
            {tiposEmpleado.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.nombre}
              </option>
            ))}
          </Select>
        </FormularioRegistroSecciones>

        <ContenedorBoton>
          <Boton as="button" type="submit">
            Actualizar Datos
          </Boton>
        </ContenedorBoton>
      </FormularioRegistro>
    </>
  );
};

export default EditarEmpleado;
