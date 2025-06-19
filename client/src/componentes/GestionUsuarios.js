import {Header, Titulo, ContenedorHeader, Subtitulo} from '../elementos/Header';
import Boton from '../elementos/Boton';
import React, {useState} from 'react';
import {Helmet} from 'react-helmet'; 
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import pantera1 from '../imagenes/Pantera1.png'
import BotonAtras from '../elementos/BotonAtras';
import AnadirUsuario from '../imagenes/AgregarUsuario.png'
import EliminarUsuario from '../imagenes/EliminarUsuario.png'
import BuscarUsuario from '../imagenes/BuscarUsuario.png'


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



const GestionUsuarios =() =>{
    const navigate = useNavigate(); 
    return(
        <>
          <Helmet>
				<title>Gestión de Usuarios</title>
			</Helmet>
			
        <Header>
				<ContenedorHeader>
					<Titulo>Gestión de Usuarios</Titulo>
					</ContenedorHeader>
			</Header>
            <BotonAtras ruta="/inicio-empleado"/>


            <ContenedorImagen>
      <ImagenLogo1 src={AnadirUsuario} alt="LogoUam" />
      <ImagenLogo1 src={EliminarUsuario} alt="LogoUam" />
      </ContenedorImagen>
      <ContenedorBotonRegistro>
					<Boton as="button" primario type="submit" onClick={() => navigate("/registro-usuarios")} > Añadir Usuario</Boton>
					<Boton as="button" primario type="submit" onClick={() => navigate("/eliminar-usuarios")}> Eliminar Usuario</Boton>
			</ContenedorBotonRegistro>
      <ContenedorImagen>
      <ImagenLogo1 src={BuscarUsuario} alt="LogoUam" /> 
      </ContenedorImagen>
      <ContenedorBotonRegistro>
					<Boton as="button" primario type="submit" onClick={() => navigate("/mostrar-usuarios")} > Mostrar Usuarios</Boton> 
			</ContenedorBotonRegistro>
     
        </>
    );

}

export default GestionUsuarios;