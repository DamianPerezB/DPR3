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

const EditarPass = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    matricula: "",
    password: "",
    repeatPassword: "",
    nombre: "",
    apellidop: "",
    apellidom: "",
  });

  useEffect(() => {
    const fetchAlumno = async () => {
      try {
        const response = await fetch(`http://localhost:4000/alumno/${id}`);
        if (response.ok) {
          const data = await response.json();
          console.log("Datos recibidos:", data);

          setFormData({
            matricula: data.matricula || "",
            password: "",
            repeatPassword: "",
            nombre: data.nombre || "",
            apellidop: data.apellidopaterno || "",
            apellidom: data.apellidomaterno || "",
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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.repeatPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    try {
      const alumnoData = {
        password: formData.password,
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
        console.log("Alumno actualizado:", data);
        alert("Datos del alumno actualizados con éxito");
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

      <BotonAtras ruta="/mostrar-alumnos-pass" />
      <ImagenMotas src={imagen1} alt="MotasUam" />

      <FormularioRegistro onSubmit={handleSubmit}>
        <FormularioRegistroSecciones>
          <TitutuloSecciones>Datos del Alumno</TitutuloSecciones>
          <Subtitulo>
            <p><strong>Nombre:</strong> {formData.nombre}</p>
            <p><strong>Apellido Paterno:</strong> {formData.apellidop}</p>
            <p><strong>Apellido Materno:</strong> {formData.apellidom}</p>
            <p><strong>Matrícula:</strong> {formData.matricula}</p>
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

        <ContenedorBoton>
          <Boton as="button" type="submit">
            Actualizar Contraseña
          </Boton>
        </ContenedorBoton>
      </FormularioRegistro>
    </>
  );
};

export default EditarPass;
