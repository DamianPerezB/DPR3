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
import AnadirReporte from "../imagenes/AgregarReporte.png";
import EliminarReporte from "../imagenes/EliminarReporte.png";
import BuscarReporte from "../imagenes/BuscarReporte.png";

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

const Reportes = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Gestión de Reportes</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Gestión de Reportes</Titulo>
        </ContenedorHeader>
      </Header>
      <BotonAtras ruta="/inicio-empleado" />

      <ContenedorImagen>
        <ImagenLogo1 src={AnadirReporte} alt="LogoUam" />
        <ImagenLogo1 src={EliminarReporte} alt="LogoUam" />
      </ContenedorImagen>
      <ContenedorBotonRegistro>
        <Boton
          as="button"
          primario
          type="submit"
          onClick={() => navigate("/registro-reporte")}
        >
          {" "}
          Añadir Reporte
        </Boton>
        <Boton as="button" primario type="submit">
          {" "}
          Eliminar Reporte
        </Boton>
      </ContenedorBotonRegistro>
      <ContenedorImagen>
        <ImagenLogo1 src={BuscarReporte} alt="LogoUam" />
      </ContenedorImagen>
      <ContenedorBotonRegistro>
        <Boton as="button" primario type="submit">
          {" "}
          Mostrar Reportes
        </Boton>
      </ContenedorBotonRegistro>
    </>
  );
};

export default Reportes;
