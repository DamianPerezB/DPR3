import React from 'react';
import styled from 'styled-components';
import imagen from '../imagenes/conjunto-baseCua.png'
import imagen2 from '../imagenes/cuagr.png'

const ImagenLogo1 = styled.img`
filter: grayscale(100%) brightness(0%); /*hacerlo gris*/
margin-left:0%;
margin-top: 2%; /* espacio hacia arriba*/
width:40%;

    @media (max-width: 768px) {
        margin-left: 0; /* Elimina el margen izquierdo en pantallas pequeñas */
        width: 92%; /* Ocupa todo el ancho del contenedor en pantallas pequeñas */
    }

`;

const ContenedorTitulo = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-left: 3.5%; /* Espacio del 10% a la izquierda */

`;
const ImagenLogo2 = styled.img`

filter: grayscale(100%) brightness(0%); /*hacerlo gris*/
margin-top: 2%; /* se mueve hacia arriba*/
position: absolute; //
top: 45%; //posicion inicial y
left: 0; //posicion inicial x
width: 100%; 
height: 66%;
object-fit: cover; /* Asegura que la imagen cubra el contenedor */
z-index: -1; /* Envía la imagen al fondo */

@media (max-width: 768px) {
    margin-left: 0; /* Elimina el margen izquierdo en pantallas pequeñas */
    width: 92%; /* Ocupa todo el ancho del contenedor en pantallas pequeñas */
}

`;


const Titulos=()=> {
    return (
      <>
            <ContenedorTitulo>
            <ImagenLogo1 src={imagen} alt="LogoUamCuajimalpa" />     

            </ContenedorTitulo>
            <ImagenLogo2 src={imagen2} alt="LogoUamCuajimalpa" />
      </>
    );
  }
  
  export default Titulos;
  