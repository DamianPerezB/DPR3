import {
  Header,
  Titulo,
  ContenedorHeader,
  Subtitulo,
} from "../elementos/Header";
import Boton from "../elementos/Boton";
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
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

const EditarAlumno = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    matricula: "",
    password: "",
    repeatPassword: "",
    nombre: "",
    apellidop: "",
    apellidom: "",
    unidad: "",
    division: "",
    licenciatura: "",
    estado: "",
    correoinstitucional: "",
    observaciones: "",
  });

  useEffect(() => {
    const fetchAlumno = async () => {
      try {
        const response = await fetch(`http://localhost:4000/alumno/${id}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            matricula: data.matricula || "",
            password: "",
            repeatPassword: "",
            nombre: data.nombre || "",
            apellidop: data.apellidopaterno || "",
            apellidom: data.apellidomaterno || "",
            unidad: data.unidad ? String(data.unidad) : "",
            division: data.division || "",
            licenciatura: data.licenciatura ? String(data.licenciatura) : "",
            estado: data.estado ? String(data.estado) : "",
            correoinstitucional: data.correoinstitucional || "",
            observaciones: data.observaciones || "",
          });
        }
      } catch (error) {
        console.error("Error al cargar alumno:", error);
      }
    };

    if (id) {
      fetchAlumno();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    if (name === "matricula" && !/^[0-9]*$/.test(value)) {
      return;
    }

    if (name === "licenciatura") {
      if (["131", "141", "144", "132"].includes(value)) {
        updatedFormData.division = "CNI";
      } else if (["130", "137", "138"].includes(value)) {
        updatedFormData.division = "CCD";
      } else if (["128", "129", "135", "136"].includes(value)) {
        updatedFormData.division = "CSH";
      }
    }

    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.repeatPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    if (!formData.correoinstitucional.endsWith("@cua.uam.mx")) {
      alert("El correo debe terminar en @cua.uam.mx");
      return;
    }

    if (formData.matricula.length !== 10) {
      alert("El formato de la matrícula es incorrecto.");
      return;
    }

    try {
      const alumnoData = {
        ...formData,
        sancion: 0,
      };

      if (!formData.password) {
        delete alumnoData.password;
      }

      const response = await fetch(`http://localhost:4000/alumno/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alumnoData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Datos del alumno actualizados con éxito");
        navigate("/mostrar-alumnos");
      } else {
        const errorData = await response.json();
        console.error("Error al actualizar:", errorData);
        alert("Error al actualizar al alumno");
      }
    } catch (error) {
      console.error("Error al enviar la solicitud PUT:", error);
      alert("Ocurrió un error al actualizar al alumno");
    }
  };

  return (
    <>
      <Helmet>
        <title>Edición de alumno</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Edición de alumno</Titulo>
        </ContenedorHeader>
      </Header>

      <BotonAtras ruta="/mostrar-alumnos" />

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
              name="apellidop"
              value={formData.apellidop}
              onChange={handleChange}
              placeholder="Apellido Paterno"
              required
            />
            <Input2
              type="text"
              name="apellidom"
              value={formData.apellidom}
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
          <TitutuloSecciones>Datos del Alumno</TitutuloSecciones>
          <Input2
            type="text"
            name="matricula"
            value={formData.matricula}
            onChange={handleChange}
            placeholder="Matrícula"
            required
          />
          <Select
            name="unidad"
            value={formData.unidad}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione Unidad</option>
            <option value="1">Azcapotzalco</option>
            <option value="2">Iztapalapa</option>
            <option value="3">Xochimilco</option>
            <option value="4">Cuajimalpa</option>
            <option value="5">Lerma</option>
          </Select>
          <Select
            name="licenciatura"
            value={formData.licenciatura}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione Licenciatura</option>
            <option value="131">Ingeniería en Computación</option>
            <option value="141">Ingeniería Biológica</option>
            <option value="144">Biología Molecular</option>
            <option value="132">Matemáticas Aplicadas</option>
            <option value="130">Diseño</option>
            <option value="137">Tecnologías y Sistemas de Información</option>
            <option value="138">Ciencias de la Comunicación</option>
            <option value="128">Administración</option>
            <option value="129">Derecho</option>
            <option value="135">Estudios Socioterritoriales</option>
            <option value="136">Humanidades</option>
          </Select>
          <Select
            name="estado"
            value={formData.estado}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione Estado</option>
            <option value="1">Inscrito</option>
            <option value="2">No inscrito</option>
          </Select>
          <Input2
            type="text"
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            placeholder="Observaciones"
          />
          <Input2
            type="email"
            name="correoinstitucional"
            value={formData.correoinstitucional}
            onChange={handleChange}
            placeholder="Correo Institucional"
            required
          />
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

export default EditarAlumno;