import { Header, Titulo, ContenedorHeader } from "../elementos/Header";
import Boton from "../elementos/Boton";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
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
  position: absolute; /* Coloca el contenedor en la posición absoluta */
  top: 12%; /* Alínea la imagen al borde superior */
  left: 76%; /* Alínea la imagen al borde izquierdo */
  width: 24%; /* Ocupa todo el ancho de la pantalla */
  height: 80%; /* Ocupa todo el alto de la pantalla */

  z-index: -1; /* Envía la imagen detrás del formulario */
  @media (max-width: 768px) {
    margin-left: 0; /* Elimina el margen izquierdo en pantallas pequeñas */
    width: 24%; /* Ocupa todo el ancho del contenedor en pantallas pequeñas */
    height: 80%;
    left: 76%; /* Alínea la imagen al borde izquierdo */
  }
`;
const ContrasenaOlvidada = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>¡OOPS! Contraseña Olvidada</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>¡OOPS! Alguién Olvido su Contraseña ?</Titulo>
        </ContenedorHeader>
      </Header>
      <ImagenMotas src={imagen1} alt="MotasUam" />

      <BotonAtras ruta="/" />

      <FormularioRegistro>
        <FormularioRegistroSecciones>
          <TitutuloSecciones>
            Ingresa los datos del Alumno para buscar
          </TitutuloSecciones>
          Usuario
          <Input2
            type="text"
            name="nombre"
            placeholder="Nombre(s): Ej: Bryann Uriel"
          />
          Correo Institucional
          <Input2
            type="email"
            name="correoInstitucional"
            placeholder="Correo Electrónico Institucional: Ej: bryann.gutierrez@cua.uam.mx"
          />
        </FormularioRegistroSecciones>

        <ContenedorBoton>
          <Boton
            as="button"
            primario
            type="submit"
            onClick={() => navigate("/contraseña-recupera")}
          >
            Buscar Alumno
          </Boton>
        </ContenedorBoton>
      </FormularioRegistro>
    </>
  );
};

export default ContrasenaOlvidada;
