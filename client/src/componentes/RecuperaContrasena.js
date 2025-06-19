import {Header, Titulo, ContenedorHeader} from '../elementos/Header';
import Boton from '../elementos/Boton';
import React, {useState} from 'react';
import {Helmet} from 'react-helmet'; 
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {TitutuloSecciones,FormularioRegistroSecciones,Select,Input2, ContenedorBoton,FormularioRegistro} from '../elementos/ElementosDeFormulario'
import imagen1 from '../imagenes/motasPantera4.png'

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
const RecuperaContrasena = () => {
    const navigate = useNavigate();
    return (  
        <>
        <Helmet>
              <title>Recuperar Contraseña</title>
          </Helmet>
          
        <Header>
              <ContenedorHeader>
                  <Titulo>Recuperar Contraseña</Titulo>
                  </ContenedorHeader>
        </Header>
        <ImagenMotas src={imagen1} alt="MotasUam" />
        <FormularioRegistro>
		<FormularioRegistroSecciones>
	<TitutuloSecciones>Alumno Encontrado</TitutuloSecciones>	
        Usuario<Input2  type="text" 
                name="nombre" 
                placeholder="Nombre(s): Ej: Jose" />
         Correo Institucional<Input2  type="email" 
                name="correoInstitucional" 
                placeholder="Correo Electrónico Institucional: Ej: jose.ruiz@cua.uam.mx" />
         Contraseña<Input2  type="password" 
                        name="password" 
                        placeholder="Contraseña" />
         Repite contraseña<Input2  type="password" 
                        name="repeatPassword" 
                        placeholder="Repetir Contraseña" />
     </FormularioRegistroSecciones>

        
				
	        <ContenedorBoton>
	                <Boton as="button" primario type="submit" onClick={() => navigate("/inicio-empleado")}>Actualizar Contraseña</Boton>
		</ContenedorBoton>
	</FormularioRegistro>
  
      </>


    );
}
 
export default RecuperaContrasena