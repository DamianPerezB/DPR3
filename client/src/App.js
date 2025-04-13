import React from 'react';
import {Header, Titulo, ContenedorHeader, Subtitulo} from './elementos/Header';
import {Helmet} from 'react-helmet'; 
import styled from 'styled-components';
import Logo from './imagenes/propuestaDepartamenteLogo.png'
import './App.css';
import Boton from './elementos/Boton';

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
	width:100%;
	margin-left:30%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ContenedorBotonRegistro = styled.div`
	  display: flex;
    justify-content: center;
    margin: 1.5% ;  /* 40px */
    gap: 100px; /* Espacio entre los botones */
`;


const App=()=> {
  return (
    <>
    <Helmet>
				<title>Inicio de Empleado</title>
			</Helmet>
			
        <Header>
				<ContenedorHeader>
					<Titulo>Plataforma de Prestamo del Departamento de Matemáticas aplicadas y Ciencias</Titulo>
					</ContenedorHeader>
			</Header>
      <ContenedorImagen>
      <ImagenLogo1 src={Logo} alt="LogoUamDepartamento" />
      </ContenedorImagen>
      <Boton>INICIO SESIÓN</Boton>

    


    </>
  );
}

export default App;
