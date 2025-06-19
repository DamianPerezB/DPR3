import {
  Header,
  Titulo,
  ContenedorHeader,
} from "../elementos/Header";
import Boton from "../elementos/Boton";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BotonAtras from "../elementos/BotonAtras";
import AnadirAviso from "../imagenes/AgregarAviso.png";
import EliminarAviso from "../imagenes/EliminarAviso.png";
import BuscarAviso from "../imagenes/BuscarAviso.png";
const ImagenLogo1 = styled.img`
  margin-right: 2%;
  width: 35%; /* La imagen es un 30% más pequeña */
  @media (max-width: 768px) {
    margin-top: -400px;
    width: 40%; /* Ocupa todo el ancho del contenedor en pantallas pequeñas */
  }
`;

const ContenedorImagen = styled.div`
  height: 100%;
  width: 100%;
  margin-left: 13%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ContenedorBotonRegistro = styled.div`
  display: flex;
  justify-content: center;
  margin: 1% 0; /* 40px */
  gap: 300px; /* Espacio entre los botones */
`;

const Avisos = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Gestión de Avisos</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Gestión de Avisos</Titulo>
        </ContenedorHeader>
      </Header>
      <BotonAtras ruta="/inicio-empleado" />

      <ContenedorImagen>
        <ImagenLogo1 src={AnadirAviso} alt="LogoUam" />
        <ImagenLogo1 src={EliminarAviso} alt="LogoUam" />
      </ContenedorImagen>
      <ContenedorBotonRegistro>
        <Boton
          as="button"
          primario
          type="submit"
          onClick={() => navigate("/registro-aviso")}
        >
          {" "}
          Añadir Aviso
        </Boton>
        <Boton as="button" primario type="submit">
          {" "}
          Eliminar Aviso
        </Boton>
      </ContenedorBotonRegistro>
      <ContenedorImagen>
        <ImagenLogo1 src={BuscarAviso} alt="LogoUam" />
      </ContenedorImagen>
      <ContenedorBotonRegistro>
        <Boton as="button" primario type="submit">
          {" "}
          Mostrar Avisos
        </Boton>
      </ContenedorBotonRegistro>
    </>
  );
};

export default Avisos;
