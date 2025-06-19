import {Header, Titulo, ContenedorHeader} from '../elementos/Header';
import Boton from '../elementos/Boton';
import {Helmet} from 'react-helmet'; 
import {useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import Materiales from '../imagenes/orden.png'
import Historico from '../imagenes/Historico.png'
import Perfil from '../imagenes/HuellaPantera.png'
import BotonAtras from "../elementos/BotonAtras";
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



const HomeAlumno =() =>{
  const navigate = useNavigate();
    return(
        <>
          <Helmet>
				<title>Inicio de Alumno</title>
			</Helmet>
			
        <Header>
				<ContenedorHeader>
					<Titulo>Inicio de Alumno</Titulo>
					</ContenedorHeader>
			</Header>
      <BotonAtras ruta="/" />
			<ContenedorImagen>
      <ImagenLogo1 src={Materiales} alt="LogoUam" />
      <ImagenLogo1 src={Historico} alt="LogoUam" />
      </ContenedorImagen>
      <ContenedorBotonRegistro>
					<Boton as="button" primario type="submit" onClick={() => navigate("/mostrar-materiales-a")}> Materiales Disponibles</Boton>
					<Boton as="button" primario type="submit"> Historico</Boton>
			</ContenedorBotonRegistro>
      <ContenedorImagen>
      <ImagenLogo1 src={Perfil} alt="LogoUam" />
      </ContenedorImagen>
      <ContenedorBotonRegistro>
					<Boton as="button" primario type="submit" onClick={() => navigate("/perfil-alumno")}> Pérfil</Boton>
			</ContenedorBotonRegistro>
      
        </>
    );

}

export default HomeAlumno;


