import {Header, Titulo, ContenedorHeader, Subtitulo} from '../elementos/Header';
import Boton from '../elementos/Boton';
import React, {useState} from 'react';
import {Helmet} from 'react-helmet'; 
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import pantera1 from '../imagenes/Pantera1.png'
import Perfil from '../imagenes/HuellaPantera.png'
import Historico from'../imagenes/Historico.png'
import Orden from '../imagenes/orden.png'
import Usuario from '../imagenes/usuario.png'
import ActualizaCredenciales from '../imagenes/ActualizaciónCredencial2.png'
import Reporte from '../imagenes/reporte.png';
import Aviso from '../imagenes/aviso.png'
import Permiso from '../imagenes/permiso.png'
import Prestamo from '../imagenes/Prestamo.png'

const ImagenLogo1 = styled.img`
    margin-right: 2%;
    width: 10%; /* La imagen es un 30% más pequeña */
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
    margin: 1.5% ;  /* 40px */
    gap: 100px; /* Espacio entre los botones */
`;



const HomeCoordinador =() =>{
   const navigate = useNavigate();
    
    return(
        <>
          <Helmet>
				<title>Inicio de Empleado</title>
			</Helmet>
			
        <Header>
				<ContenedorHeader>
					<Titulo>Inicio de Empleado</Titulo>
					</ContenedorHeader>
			</Header>
	  <ContenedorImagen>
      <ImagenLogo1 src={Orden} alt="LogoUam" />
      <ImagenLogo1 src={Historico} alt="LogoUam" />
      </ContenedorImagen>
      <ContenedorBotonRegistro>
					<Boton as="button" primario type="submit" onClick={() => navigate("/materiales")} > Materiales Disponibles</Boton>
					<Boton as="button" primario type="submit" onClick={() => navigate("/historico")}> Historico</Boton>
	  </ContenedorBotonRegistro>

      <ContenedorImagen>
      <ImagenLogo1 src={Usuario} alt="LogoUam" />
      <ImagenLogo1 src={ActualizaCredenciales} alt="LogoUam" />
      </ContenedorImagen>
      <ContenedorBotonRegistro>
					<Boton as="button" primario type="submit" onClick={() => navigate("/usuarios")}>Usuarios</Boton>
					<Boton as="button" primario type="submit" onClick={() => navigate("/contraseña-olvidada")}>Actualizar Contraseña Usuario</Boton>
			</ContenedorBotonRegistro>

      <ContenedorImagen>
      <ImagenLogo1 src={Reporte} alt="LogoUam" /> 
      <ImagenLogo1 src={Aviso} alt="LogoUam" /> 
      </ContenedorImagen>
      <ContenedorBotonRegistro>
          <Boton as="button" primario type="submit" onClick={() => navigate("/avisos")} >Avisos</Boton>
          <Boton as="button" primario type="submit" onClick={() => navigate("/reportes")} style={{marginLeft:"-40%"}}>Reportes</Boton>			
      </ContenedorBotonRegistro>

      <ContenedorImagen>
          <ImagenLogo1 src={Permiso} alt="LogoUam" /> 
          <ImagenLogo1 src={Prestamo} alt="LogoUam" /> 
      </ContenedorImagen>
      <ContenedorBotonRegistro>
          <Boton as="button" primario type="submit" onClick={() => navigate("/permisos")} >Permisos</Boton>
          <Boton as="button" primario type="submit" onClick={() => navigate("/registro-usuarios")} >Prestamos</Boton>
      </ContenedorBotonRegistro>
      
      <ContenedorImagen>
          <ImagenLogo1 src={Perfil} alt="LogoUam" />  
      </ContenedorImagen>
      <ContenedorBotonRegistro>
          <Boton as="button" primario type="submit" onClick={() => navigate("/perfil")} >Perfil</Boton> 
      </ContenedorBotonRegistro>
        </>
    );

}

export default HomeCoordinador;


