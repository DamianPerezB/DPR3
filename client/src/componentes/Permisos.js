import {Header, Titulo, ContenedorHeader, Subtitulo} from '../elementos/Header';
import Boton from '../elementos/Boton';
import React, {useState} from 'react';
import {Helmet} from 'react-helmet'; 
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import pantera1 from '../imagenes/Pantera1.png'
import BotonAtras from '../elementos/BotonAtras';
import AnadirPermiso from '../imagenes/AgregarPermiso.png'
import EliminarPermiso from '../imagenes/EliminarPermiso.png'
import BuscarPermiso from '../imagenes/BuscarPermiso.png'

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



const Permisos =() =>{
    return(
        <>
          <Helmet>
				<title>Gestión de Permisos</title>
			</Helmet>
			
        <Header>
				<ContenedorHeader>
					<Titulo>Gestión de Permisos</Titulo>
					</ContenedorHeader>
			</Header>
            <BotonAtras ruta="/inicio-empleado"/>


            <ContenedorImagen>
      <ImagenLogo1 src={AnadirPermiso} alt="LogoUam" />
      <ImagenLogo1 src={EliminarPermiso} alt="LogoUam" />
      </ContenedorImagen>
      <ContenedorBotonRegistro>
					<Boton as="button" primario type="submit"> Añadir Permiso</Boton>
					<Boton as="button" primario type="submit"> Eliminar Permiso</Boton>
			</ContenedorBotonRegistro>
      <ContenedorImagen>
      <ImagenLogo1 src={BuscarPermiso} alt="LogoUam" /> 
      </ContenedorImagen>
      <ContenedorBotonRegistro>
					<Boton as="button" primario type="submit"> Mostrar Permisos</Boton> 
			</ContenedorBotonRegistro>
     
        </>
    );

}

export default Permisos;


