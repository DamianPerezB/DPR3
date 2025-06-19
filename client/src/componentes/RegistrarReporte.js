import {Header, Titulo, ContenedorHeader, Subtitulo} from '../elementos/Header';
import Boton from '../elementos/Boton';
import React, {useState} from 'react';
import {Helmet} from 'react-helmet'; 
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import {TitutuloSecciones,FormularioRegistroSecciones,Select,Input2, ContenedorBoton,FormularioRegistro} from '../elementos/ElementosDeFormulario'
import imagen1 from '../imagenes/motasPantera4.png'
import BotonAtras from '../elementos/BotonAtras';


const ImagenMotas = styled.img`
    
    position: absolute; /* Coloca el contenedor en la posición absoluta */
    top: 12%; /* Alínea la imagen al borde superior */
    left: 76%; /* Alínea la imagen al borde izquierdo */
    width: 75% 5%; /* Ocupa todo el ancho de la pantalla */
    height: 120%; /* Ocupa todo el alto de la pantalla */
  
    z-index: -1; /* Envía la imagen detrás del formulario */
    @media (max-width: 768px) {
        margin-left: 0; /* Elimina el margen izquierdo en pantallas pequeñas */
        width: 24%; /* Ocupa todo el ancho del contenedor en pantallas pequeñas */
        height: 80%;
        left: 76%; /* Alínea la imagen al borde izquierdo */
        }

`;
const RegistrarReporte = () => {
    
    const navigate = useNavigate();
          
    return (  
        <>
        <Helmet>
              <title>Registrar Reporte</title>
          </Helmet>
          
        <Header>
              <ContenedorHeader>
                  <Titulo>Registro de Reporte</Titulo>
                  </ContenedorHeader>
        </Header>
           
        <BotonAtras ruta="/reportes"/>


        <ImagenMotas src={imagen1} alt="MotasUam" />
        <FormularioRegistro>
		<FormularioRegistroSecciones>
	<TitutuloSecciones>Datos de Reporte</TitutuloSecciones>

        
        Id Material<Input2  type="text" 
                name="idMaterial" 
                placeholder="Id: Ej: 2209999999" />
        Fecha<Input2 type="date" 
                name="fecha-registro" 
                placeholder="Selecciona una fecha" />
        hora<Input2 type="time" 
                name="fecha-registro" 
                placeholder="Selecciona una fecha" />
        Descripción<Input2  type="text" 
                name="Descripcion-producto" 
                placeholder="Id: Ej: Breve descripción" />
            </FormularioRegistroSecciones>

            
				
	        <ContenedorBoton>
	                <Boton as="button" primario type="submit" onClick={() => navigate("/inicio-empleado")}>Registrar Reporte</Boton>
		</ContenedorBoton>
	</FormularioRegistro>
  
      </>


    );
}
 
export default RegistrarReporte