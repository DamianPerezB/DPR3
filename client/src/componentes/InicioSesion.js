import { Header, Titulo, ContenedorHeader } from '../elementos/Header';
import Boton from '../elementos/Boton';
import { Helmet } from 'react-helmet';
import { Formulario, Input, ContenedorBoton } from '../elementos/ElementosDeFormulario'
import styled from 'styled-components';
import imagen from '../imagenes/variacion5Cua.png'
import { useNavigate } from "react-router-dom";

const ImagenLogo1 = styled.img`
    width: 40%; /* La imagen es un 30% más pequeña */
    margin-left:-2%; /*Se mueve a la derecha*/
    margin-top: 20px; /* Puedes ajustar el valor según sea necesario */

    @media (max-width: 768px) {
        margin-left: 0; /* Elimina el margen izquierdo en pantallas pequeñas */
        width: 92%; /* Ocupa todo el ancho del contenedor en pantallas pequeñas */
    }

`;


const ContenedorTitulo = styled.div`
	height: 10%;
	width:50%;
	margin:1%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-left: 40%; /* Espacio del 10% a la izquierda */

`;

const InicioSesion = () => {
	const navigate = useNavigate();
	return (

		<>
			<Helmet>
				<title>Inicia Sesion</title>
			</Helmet>

			<Header>
				<ContenedorHeader>
					<Titulo>Iniciar Sesión</Titulo>

				</ContenedorHeader>
			</Header>
			<ContenedorTitulo>
				<ImagenLogo1 src={imagen} alt="LogoUam" />
			</ContenedorTitulo>
			<Formulario >

				<Input
					type="email"
					name="email"
					placeholder="Correo Electrónico Institucional"

				/>
				<Input
					type="password"
					name="password"
					placeholder="Contraseña"

				/>
				<ContenedorBoton>
					<Boton as="button" primario type="submit"  onClick={() => navigate("/inicio-empleado")}>Iniciar Sesión</Boton>
					<Boton as="button" primario type="submit" onClick={() => navigate("/contrasena-olvidada")}>Olvidé mi contraseña</Boton>
				</ContenedorBoton>
			</Formulario>

		</>
	);
}
export default InicioSesion;


