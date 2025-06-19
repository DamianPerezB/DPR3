import {Header, Titulo, ContenedorHeader, Subtitulo} from '../elementos/Header';
import Boton from '../elementos/Boton';
import React, {useState} from 'react';
import {Helmet} from 'react-helmet'; 
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import BotonAtras from '../elementos/BotonAtras';
import AnadirPrestamo from '../imagenes/anadirPrestamo.png'
import ActualizarPrestamo from '../imagenes/actualizarPrestamo.png'
import MostrarPrestamo from '../imagenes/mostrarPrestamo.png'
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
	margin-left:13%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const ContenedorBotonRegistro = styled.div`
	  display: flex;
    justify-content: center;
    margin: 1% 0;  /* 40px */
    gap: 300px; /* Espacio entre los botones */
`;



const Prestamos =() =>{
    const navigate = useNavigate(); 
    return(
        <>
          <Helmet>
				<title>Gestión de Prestamos</title>
			</Helmet>
			
        <Header>
				<ContenedorHeader>
					<Titulo>Gestión de Prestamos</Titulo>
					</ContenedorHeader>
			</Header>
            <BotonAtras ruta="/inicio-empleado"/>


            <ContenedorImagen>
      <ImagenLogo1 src={AnadirPrestamo} alt="LogoUam" />
      <ImagenLogo1 src={ActualizarPrestamo} alt="LogoUam" />
      </ContenedorImagen>
      <ContenedorBotonRegistro>
					<Boton as="button" primario type="submit" onClick={() => navigate("/registro-prestamo")} > Añadir Prestamo</Boton>
					<Boton as="button" primario type="submit"> Actualizar Prestamo</Boton>
			</ContenedorBotonRegistro>
      <ContenedorImagen>
      <ImagenLogo1 src={MostrarPrestamo} alt="LogoUam" /> 
      </ContenedorImagen>
      <ContenedorBotonRegistro>
					<Boton as="button" primario type="submit"> Mostrar Prestamos</Boton> 
			</ContenedorBotonRegistro>
     
        </>
    );

}

export default Prestamos;