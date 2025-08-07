import { useEffect } from "react";
import { Header, Titulo, ContenedorHeader } from "../elementos/Header";
import Boton from "../elementos/Boton";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Materiales from "../imagenes/orden.png";
import Historico from "../imagenes/Historico.png";
import Perfil from "../imagenes/HuellaPantera.png";

const ImagenLogo1 = styled.img`
  margin-right: 2%;
  width: 35%;
  @media (max-width: 768px) {
    margin-top: -400px;
    width: 40%;
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
  margin: 1% 0;
  gap: 300px;
`;

const HomeAlumno = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("idUsuario");
    const tipo = localStorage.getItem("tipoUsuario");

    if (!id || tipo !== "alumno") {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <Helmet>
        <title>Inicio de Alumno</title>
      </Helmet>

      <Header>
        <ContenedorHeader>
          <Titulo>Inicio de Alumno</Titulo>
        </ContenedorHeader>
      </Header>

      <Boton
        as="button"
        primario
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      >
        Cerrar sesión
      </Boton>

      <ContenedorImagen>
        <ImagenLogo1 src={Materiales} alt="Materiales" />
        <ImagenLogo1 src={Historico} alt="Historico" />
      </ContenedorImagen>

      <ContenedorBotonRegistro>
        <Boton
          as="button"
          primario
          onClick={() => navigate("/mostrar-materiales-a")}
        >
          Materiales Disponibles
        </Boton>
        <Boton
          as="button"
          primario
          onClick={() => navigate("/historico-alumno")}
        >
          Historico
        </Boton>
      </ContenedorBotonRegistro>

      <ContenedorImagen>
        <ImagenLogo1 src={Perfil} alt="Perfil" />
      </ContenedorImagen>

      <ContenedorBotonRegistro>
        <Boton as="button" primario onClick={() => navigate("/perfil-alumno")}>
          Perfil
        </Boton>
      </ContenedorBotonRegistro>
    </>
  );
};

export default HomeAlumno;
