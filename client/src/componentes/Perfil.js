import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Header, Titulo, ContenedorHeader } from "../elementos/Header";
import Boton from "../elementos/Boton";
import {
  TitutuloSecciones,
  FormularioRegistroSecciones,
  Input2,
  ContenedorBoton,
  FormularioRegistro,
} from "../elementos/ElementosDeFormulario";
import imagen1 from "../imagenes/motasPantera4.png";

const ImagenMotas = styled.img`
  position: absolute;
  top: 12%;
  left: 76%;
  width: 24%;
  height: 80%;
  z-index: -1;
  @media (max-width: 768px) {
    margin-left: 0;
    width: 24%;
    height: 80%;
    left: 76%;
  }
`;

const Perfil = () => {
  const navigate = useNavigate();
  const [empleado, setEmpleado] = useState(null);
  const [permisos, setPermisos] = useState([]);

  useEffect(() => {
    const id = localStorage.getItem("idUsuario");
    const tipo = localStorage.getItem("tipoUsuario");

    if (!id || tipo !== "empleado") {
      navigate("/");
    }
    // Obtener datos del empleado
    fetch(`http://localhost:4000/empleado/${id}`)
      .then((response) => response.json())
      .then((data) => setEmpleado(data))
      .catch((error) => console.error("Error al obtener empleado:", error));

    // Obtener permisos del empleado
    fetch(`http://localhost:4000/empleado/permisos/${id}`)
      .then((response) => response.json())
      .then((data) => setPermisos(data))
      .catch((error) => console.error("Error al obtener permisos:", error));
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Perfil</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Perfil</Titulo>
        </ContenedorHeader>
      </Header>

      <ImagenMotas src={imagen1} alt="MotasUam" />

      <FormularioRegistro>
        <FormularioRegistroSecciones>
          <TitutuloSecciones>Datos del Empleado</TitutuloSecciones>

          {empleado ? (
            <>
              Nombre completo:
              <Input2
                value={`${empleado.nombre} ${empleado.apellidopaterno} ${empleado.apellidomaterno}`}
                disabled
              />
              No. Económico:
              <Input2 value={empleado.noeconomico} disabled />
              Correo institucional:
              <Input2 value={empleado.correoinstitucional} disabled />
              Estado:
              <Input2 value={empleado.estado_nombre} disabled />
              Tipo:
              <Input2 value={empleado.tipo_nombre} disabled />
              Permisos:
              <Input2 value={permisos.join(", ")} disabled />
            </>
          ) : (
            <p>Cargando datos...</p>
          )}
        </FormularioRegistroSecciones>

        <ContenedorBoton>
          <Boton
            as="button"
            primario
            type="button"
            onClick={() => navigate("/inicio-empleado")}
          >
            Regresar al Menú
          </Boton>
        </ContenedorBoton>
      </FormularioRegistro>
    </>
  );
};

export default Perfil;
